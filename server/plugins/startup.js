// Nitro startup plugin to log the application version on boot
export default defineNitroPlugin(() => {
  logger.info(`Starting portfolio application`, null, {
    event: 'startup'
  })
})
