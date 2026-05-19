export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const { getPostBySlug } = useGhostApi()
  return await getPostBySlug(slug)
})
