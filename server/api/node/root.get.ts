export default defineEventHandler(async () => {
  const client = useEdgeDb();
  const e = useEdgeDbQueryBuilder();
  return await e
    .select(e.Node, (node) => ({
      item: {
        label: {
          es: true,
          en: true,
        },
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
          label: {
            es: true,
            en: true,
          },
        },
        position: true,
      },
      position: true,
      filter_single: e.op(node.position, "=", -1),
    }))
    .run(client);
});
