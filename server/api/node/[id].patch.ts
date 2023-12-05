export default defineEventHandler(async (req) => {
  const { id } = getRouterParams(req);
  const client = useEdgeDb();
  const e = useEdgeDbQueryBuilder();
  const { item, children, position, style } = await readBody(req);

  return await e
    .update(e.Node, () => ({
      filter_single: { id },
      set: {
        style,
        item: e.insert(e.Item, {
          ...item,
          label: e.insert(e.Label, item.label),
        }),
        position,
        ...(children
          ? {
              children: e.select(e.detached(e.Node), (node) => ({
                filter: e.op(
                  node.id,
                  "in",
                  e.set(...children.map((child: any) => e.uuid(child.id)))
                ),
              })),
            }
          : {}),
      },
    }))
    .run(client);
});