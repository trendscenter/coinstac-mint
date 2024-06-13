export interface StartRunInput {
  consortiumId: string
}

export interface StartRunOutput {
  runId: string
}

export interface runStartCentralPayload {
  runId: string
  imageName: string
  userIds: string[]
  consortiumId: string
  computationParameters: string
}

export interface runStartEdgePayload {
  runId: string
  imageName: string
  consortiumId: string
  downloadUrl: string
  downloadToken: string
}

export interface PublicUser {
  id: string;
  username: string;
}
export interface User {
  id: string
  username: string
}

export interface ConsortiumListItem {
  title: string;
  description: string;
  leader: PublicUser;
  members: PublicUser[];
}

export interface ComputationListItem {
  id: string;
  title: string;
  imageName: string;
}

export default `#graphql
  type PublicUser {
    id: String
    username: String
  }

  type ConsortiumListItem {
    id: String
    title: String
    description: String
    leader: PublicUser
    members: [PublicUser]
  }

  type ComputationListItem {
    id: String
    title: String
    imageName: String
  }
  

  input StartRunInput {
    consortiumId: String
  }

  type RunStartCentralPayload {
    runId: String
    imageName: String
    userIds: [String]
    consortiumId: String
    computationParameters: String
  }

  type RunStartEdgePayload {
    runId: String
    imageName: String
    consortiumId: String
    downloadUrl: String
    downloadToken: String
  }

  type StartRunOutput {
    runId: String
  }

  type Query {
    getConsortiumList: [ConsortiumListItem]
    getComputationList: [ComputationListItem]
  }

  type Mutation {
    login(username: String, password: String): String
    startRun(input: StartRunInput): StartRunOutput
    reportRunReady(runId: String): Boolean
    reportError(runId: String, errorMessage: String): Boolean
    reportComplete(runId: String): Boolean
    reportStatus(runId: String, status: String): Boolean
  }

  type Subscription {
    runStartCentral: RunStartCentralPayload
    runStartEdge: RunStartEdgePayload
  }
`
