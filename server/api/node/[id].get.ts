export default defineEventHandler(async (req) => {
  const { id } = getRouterParams(req);
  const client = useEdgeDb();
  const e = useEdgeDbQueryBuilder();

  return await e
    .select(e.Node, () => ({
      item: true,
      children: true,
      position: true,
      filter_single: { id },
    }))
    .run(client);
});
