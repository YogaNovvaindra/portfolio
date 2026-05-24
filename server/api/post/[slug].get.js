export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const { getPostBySlug } = useGhostApi(event)
  return await getPostBySlug(slug)
})
