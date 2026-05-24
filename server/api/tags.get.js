export default defineEventHandler(async (event) => {
  const { getTags } = useGhostApi(event)
  return await getTags()
})
