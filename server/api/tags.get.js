export default defineEventHandler(async (event) => {
  const { getTags } = useGhostApi(event)
  try {
    return await getTags()
  } catch (err) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Internal Server Error'
    })
  }
})
