export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const limit = query.limit || 'all'
  const page = query.page || 1
  const filter = query.filter || null
  
  const { getPosts } = useGhostApi()
  return await getPosts(limit, page, filter)
})
