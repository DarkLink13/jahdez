export default defineEventHandler(async (req) => {
  const { id } = getRouterParams(req);
  const client = useEdgeDb();
  const e = useEdgeDbQueryBuilder();

  return await e
    .select(e.Node, () => ({
      id: true,
      item: {
        label: true,
        action: true,
        details: true,
        exp: true,
        mode: true,
        style: true,
        type: true,
        background: true,
        colors: true,
        description: true,
      },
      children: {
        id: true,
        item: {
          label: true,
        },
        position: true,
      },
      position: true,
      filter_single: { id },
    }))
    .run(client);
});
