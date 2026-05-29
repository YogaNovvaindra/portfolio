export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const { getPostBySlug } = useGhostApi(event)
  try {
    return await getPostBySlug(slug)
  } catch (err) {
    if (err.statusCode === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post Not Found'
      })
    }
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Internal Server Error'
    })
  }
})
