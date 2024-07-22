import Docker from 'dockerode'
const docker = new Docker()

interface LaunchNodeArgs {
  containerService: string
  imageName: string
  directoriesToMount: Array<{
    hostDirectory: string
    containerDirectory: string
  }>
  portBindings: Array<{
    hostPort: number
    containerPort: number
  }>
  commandsToRun: string[]
  onContainerExitSuccess?: (containerId: string) => void
  onContainerExitError?: (containerId: string, error: Error) => void
}

interface ExposedPorts {
  [portWithProtocol: string]: {} // Correctly defined for exposing ports
}

interface PortBindings {
  [portWithProtocol: string]: Array<{ HostPort: string }> // Define port bindings with HostPort as string
}

export async function launchNode({
  containerService,
  imageName,
  directoriesToMount,
  portBindings,
  commandsToRun,
  onContainerExitSuccess,
  onContainerExitError,
}: LaunchNodeArgs) {
  if (containerService === 'docker') {
    await launchDockerNode({
      imageName,
      directoriesToMount,
      portBindings,
      commandsToRun,
      onContainerExitSuccess,
      onContainerExitError,
    })
  } else if (containerService === 'singularity') {
    // Placeholder for singularity command handling
    console.log('Singularity handling not implemented.')
  }
}

const launchDockerNode = async ({
  imageName,
  directoriesToMount,
  portBindings,
  commandsToRun,
  onContainerExitSuccess,
  onContainerExitError,
}: Omit<LaunchNodeArgs, 'containerService'>) => {
  console.log('Running docker command')

  const binds = directoriesToMount.map(
    (mount) => `${mount.hostDirectory}:${mount.containerDirectory}`,
  )
  const exposedPorts: ExposedPorts = {}
  const portBindingsFormatted: PortBindings = {}

  portBindings.forEach((binding) => {
    const containerPort = `${binding.containerPort}/tcp`
    exposedPorts[containerPort] = {} // Just expose the port
    portBindingsFormatted[containerPort] = [{ HostPort: `${binding.hostPort}` }] // Correctly format as string
  })

  try {
    // Create the container
    const container = await docker.createContainer({
      Image: imageName,
      Cmd: commandsToRun,
      ExposedPorts: exposedPorts,
      HostConfig: {
        Binds: binds,
        PortBindings: portBindingsFormatted,
      },
    })

    // Start the container
    await container.start()
    console.log(`Container started successfully: ${container.id}`)

    // Add event handlers for the container
    attachDockerEventHandlers(
      container.id,
      onContainerExitSuccess,
      onContainerExitError,
    )

    // Return the container ID
    return container.id
  } catch (error) {
    console.error(`Failed to launch Docker container: ${error}`)
    onContainerExitError && onContainerExitError('', error as Error)
    throw error
  }
}

const attachDockerEventHandlers = (
  containerId: string,
  onContainerExitSuccess?: (containerId: string) => void,
  onContainerExitError?: (containerId: string, error: Error) => void,
) => {
  docker.getEvents((err, stream) => {
    if (err) {
      console.error(`Error getting Docker events: ${err}`)
      onContainerExitError && onContainerExitError(containerId, err)
      return
    }
    stream?.on('data', (chunk) => {
      const event = JSON.parse(chunk.toString())

      if (event.Type === 'container' && event.Actor.ID === containerId) {
        if (event.Action === 'die') {
          const exitCode = parseInt(event.Actor.Attributes.exitCode, 10)
          if (exitCode !== 0) {
            console.error(
              `Container ${containerId} stopped due to an error with exit code: ${exitCode}`,
            )
            onContainerExitError &&
              onContainerExitError(
                containerId,
                new Error(`Exit code: ${exitCode}`),
              )
          } else {
            console.log(`Container ${containerId} stopped gracefully`)
            onContainerExitSuccess && onContainerExitSuccess(containerId)
          }
        }

        if (event.Action === 'stop') {
          console.log(`Container ${containerId} stopped gracefully`)
          onContainerExitSuccess && onContainerExitSuccess(containerId)
        }
      }
    })

    stream?.on('error', (err) => {
      console.error(`Event stream error: ${err}`)
      onContainerExitError && onContainerExitError(containerId, err)
    })
  })
}
