// Every node in one flat list. The graph is a DAG (a position can hang from
// several projects) and has detached nodes, so callers walk it from `children`.
export default defineEventHandler(async () => {
  const client = useEdgeDb();
  const e = useEdgeDbQueryBuilder();
  return await e
    .select(e.Node, () => ({
      id: true,
      position: true,
      children: { id: true },
      item: {
        type: true,
        exp: true,
        action: true,
        mode: true,
        label: { es: true, en: true, type: true, subvalue: true },
        sublabels: { es: true, en: true, type: true, subvalue: true },
        description: { es: true, en: true },
        icon: { key: true },
        background: { src: true },
        colors: { primary: true, secondary: true },
      },
    }))
    .run(client);
});
