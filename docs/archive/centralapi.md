## Table of Contents

- [Table of Contents](#table-of-contents)
- [UI Operations](#ui-operations)
- [Edge Client Operations](#edge-client-operations)
- [Central Client Operations](#central-client-operations)

## UI Operations

GraphQL operations for user interaction and system management:

- Mutations:
  - `login`
  - `createAccount`
  - `changePassword`
  - `createConsortium`
  - `joinConsortium`
  - `acceptMember`
  - `removeMember`
  - `setStudyDetails`
  - `startRun`
  - `stopRun`

## Edge Client Operations

Operations for Edge clients, focusing on event subscriptions and error reporting:

- Subscriptions:
  - `EdgeClientStartRun`
  - `stopRun`
- Mutations:
  - `EdgeClientReportError`

## Central Client Operations

Operations for Central clients, mirroring Edge clients with additional status reporting:

- Subscriptions:
  - `CentralClientStartRun`
  - `stopRun`
- Mutations:
  - `CentralClientRunReportStatus`
  - `CentralClientReportError`


```
import concern1 from concern1
resolvers={
	queries: {
		...concern1.queries
		...concern2.queries
	}
}
```


```
resolvers={
	queries:{}
	mutations:{}
	subscriptions:{}
}
```

```
resolvers={
	startRun: (all the args)=>{
		// await provision and host
	    // emit start run event
	}

}
```