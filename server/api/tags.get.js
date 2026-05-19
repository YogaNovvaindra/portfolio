export default defineEventHandler(async () => {
  const { getTags } = useGhostApi()
  return await getTags()
})
