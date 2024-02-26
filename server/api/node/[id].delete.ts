export default defineEventHandler(async (req) => {
  const client = useEdgeDb();
  const e = useEdgeDbQueryBuilder();
  const { id } = getRouterParams(req);
  return await e
    .delete(e.Node, () => ({
      filter_single: { id },
    }))
    .run(client);
});
