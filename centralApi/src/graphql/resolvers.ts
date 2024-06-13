import { generateTokens, compare } from '../authentication/authentication.js'
import getConfig from '../config/getConfig.js'
import Consortium from '../database/models/Consortium.js'
import Run from '../database/models/Run.js'
import User from '../database/models/User.js'
import pubsub from './pubSubService.js'
import { withFilter } from 'graphql-subscriptions'
import {
  StartRunInput,
  StartRunOutput,
  runStartCentralPayload,
  runStartEdgePayload,
} from './typeDefs.js'
interface Context {
  userId: string
  roles: string[]
}

export default {
  Mutation: {
    login: async (
      _,
      {
        username,
        password,
      }: {
        username: string
        password: string
      },
      context,
    ): Promise<string> => {
      // get the user from the database
      const user = await User.findOne({ username })
      if (!user) {
        throw new Error('User not found')
      }
      // compare the password
      if (!(await compare(password, user.hash))) {
        throw new Error('Invalid username or password')
      }

      // create a token
      const tokens = generateTokens({ userId: user._id })
      const { accessToken } = tokens as { accessToken: string }
      return accessToken
    },
    startRun: async (
      _: unknown,
      { input }: { input: StartRunInput },
      context: Context,
    ): Promise<StartRunOutput> => {
      // authenticate the user
      if (!context.userId) {
        throw new Error('User not authenticated')
      }

      // get the consortium details from the database
      const consortium = await Consortium.findById(input.consortiumId)
      if (!consortium) {
        throw new Error('Consortium not found')
      }

      // authorize the user
      if (consortium.leader.toString() !== context.userId) {
        throw new Error(
          'User is not authorized to start a run for this consortium',
        )
      }

      // create a new run in the database
      const run = await Run.create({
        consortium: consortium._id,
        consortiumLeader: consortium.leader,
        studyConfiguration: consortium.studyConfiguration,
        members: consortium.activeMembers,
        status: 'Provisioning',
        runErrors: [],
      })

      pubsub.publish('RUN_START_CENTRAL', {
        runId: run._id.toString(),
        imageName: consortium.studyConfiguration.computation.imageName,
        userIds: consortium.activeMembers.map((member) => member.toString()),
        consortiumId: consortium._id.toString(),
        computationParameters:
          consortium.studyConfiguration.computationParameters,
      })

      return { runId: run._id.toString() }
    },
    reportRunReady: async (
      _: unknown,
      { runId }: { runId: string },
      context: Context,
    ): Promise<boolean> => {
      console.log('reportRunReady', runId)
      // authenticate the user
      // is the token valid?
      if (!context.userId) {
        throw new Error('User not authenticated')
      }

      // authorize the user
      if (!context.roles.includes('central')) {
        throw new Error('User not authorized')
      }

      // get the run's details from the database
      const run = await Run.findById(runId)
      const result = await Run.updateOne({ _id: runId }, { status: 'Ready' })
      const imageName = run.studyConfiguration.computation.imageName
      const consortiumId = run.consortium._id

      pubsub.publish('RUN_START_EDGE', {
        runId,
        imageName: imageName,
        consortiumId: consortiumId,
      })

      return true
    },
    reportError: async (
      _: unknown,
      { runId, errorMessage }: { runId: string; errorMessage: string },
    ): Promise<boolean> => {
      return true
    },
    reportComplete: async (_: unknown, { runId }): Promise<boolean> => {
      return true
    },
    reportStatus: async (
      _: unknown,
      { runId, statusMessage }: { runId: string; statusMessage: string },
    ): Promise<boolean> => {
      return true
    },
  },
  Subscription: {
    runStartCentral: {
      resolve: (payload: runStartCentralPayload): runStartCentralPayload => {
        return payload
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator(['RUN_START_CENTRAL']),
        // Placeholder for future filtering logic. Currently returns true for all payloads.
        (
          payload: runStartCentralPayload,
          variables: unknown,
          context: Context,
        ) => {
          console.log(context)
          return context.roles.includes('central')
        },
      ),
    },
    runStartEdge: {
      resolve: (
        payload: runStartEdgePayload,
        args: unknown,
        context: Context,
      ): runStartEdgePayload => {
        const { runId, imageName, consortiumId } = payload
        // get the user's id from the context
        const userId = context.userId
        // create a token
        const tokens = generateTokens(
          { userId, runId, consortiumId },
          { shouldExpire: true },
        )

        const { accessToken } = tokens as { accessToken: string }

        const { fileServerUrl } = getConfig()

        const output = {
          userId,
          runId,
          imageName,
          consortiumId,
          downloadUrl: `${fileServerUrl}/download/${consortiumId}/${runId}/${userId}`,
          downloadToken: accessToken,
        }

        return output
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator(['RUN_START_EDGE']),
        // Placeholder for future filtering logic. Currently returns true for all payloads.
        (
          payload: runStartEdgePayload,
          variables: unknown,
          context: Context,
        ) => {
          // if the user is not a part of this run, they should not receive the payload
          return true
        },
      ),
    },
  },
}
