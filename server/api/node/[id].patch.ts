export default defineEventHandler(async (req) => {
  const { id } = getRouterParams(req);
  const client = useEdgeDb();
  const e = useEdgeDbQueryBuilder();
  const { children, position, item, style } = await readBody(req);

  await e
    .update(e.Item, () => ({
      filter_single: { id: item.id },
      set: {
        ...(item.label ? { label: e.insert(e.Label, item.label) } : {}),
        ...(item.description
          ? { description: e.insert(e.Description, item.description) }
          : {}),
      },
    }))
    .run(client);

  return await e
    .update(e.Node, () => ({
      filter_single: { id },
      set: {
        style,
        position,
        ...(children.length
          ? {
              children: e.select(e.detached(e.Node), (node) => ({
                filter: e.op(
                  node.id,
                  "in",
                  e.set(...children.map((child: any) => e.uuid(child.id))),
                ),
              })),
            }
          : {}),
      },
    }))
    .run(client);
});
