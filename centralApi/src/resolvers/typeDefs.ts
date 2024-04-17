export default `#graphql
  input StartRunInput {
    imageName: String
    userIds: [String]
    consortiumId: String
    computationParameters: String
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
    _empty: String
  }

  type Mutation {
    startRun(input: StartRunInput): StartRunOutput
  }

  type Subscription {
    runStartCentral: RunStartCentralPayload
    runStartEdge: RunStartEdgePayload
  }
`
