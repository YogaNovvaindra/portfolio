export default defineEventHandler(async () => {
  const { getSearchIndex } = useGhostApi()
  return await getSearchIndex()
})
