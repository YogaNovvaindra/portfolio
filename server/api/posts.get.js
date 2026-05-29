export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const limit = query.limit || 'all'
  const page = query.page || 1
  const filter = query.filter || null
  
  const { getPosts } = useGhostApi(event)
  try {
    return await getPosts(limit, page, filter)
  } catch (err) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Internal Server Error'
    })
  }
})
