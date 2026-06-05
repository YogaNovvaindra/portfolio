// Nitro startup plugin to log the application version on boot
export default defineNitroPlugin(() => {
  const config = useRuntimeConfig()
  const version = config.public?.appVersion || 'unknown'
  logger.info(`Starting portfolio application v${version}`, null, {
    event: 'startup',
    version
  })
})
