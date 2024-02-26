import { nodeConfig } from "~/composables/node";

export default defineEventHandler(async (req) => {
  const { id } = getRouterParams(req);
  const client = useEdgeDb();
  const e = useEdgeDbQueryBuilder();

  return await e
    .select(e.Node, () => ({
      id: true,
      ...nodeConfig,
      filter_single: { id },
    }))
    .run(client);
});
