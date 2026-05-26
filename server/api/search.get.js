export default defineEventHandler(async (event) => {
  const { getSearchIndex } = useGhostApi(event)
  return await getSearchIndex()
})
