export const defaultConfig = {
  centralServerQueryUrl: 'http://localhost:4000/graphql',
  centralServerSubscriptionUrl: 'ws://localhost:4000/graphql',
  edgeClientQueryUrl: 'http://localhost:4001/graphql',
  edgeClientSubscriptionUrl: 'ws://localhost:4001/graphql',
  edgeClientRunResultsUrl: 'http://localhost:4001/run-results',
  startEdgeClientOnLaunch: true,
  logPath: '',
  edgeClientConfig: {
    httpUrl: 'http://localhost:4000/graphql',
    wsUrl: 'ws://localhost:4000/graphql',
    path_base_directory:
      'C:/development/effective-palm-tree/_devTestDirectories/edgeSite1',
    authenticationEndpoint: 'http://localhost:4000/authenticateToken',
    hostingPort: 4001,
    logPath: '',
  },
}
