export default defineEventHandler(async (event) => {
  const { getSearchIndex } = useGhostApi(event)
  try {
    return await getSearchIndex()
  } catch (err) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Internal Server Error'
    })
  }
})
