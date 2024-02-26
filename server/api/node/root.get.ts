import { nodeConfig } from "~/composables/node";
export default defineEventHandler(async () => {
  const client = useEdgeDb();
  const e = useEdgeDbQueryBuilder();
  return await e
    .select(e.Node, (node) => ({
      ...nodeConfig,
      filter_single: e.op(node.position, "=", -1),
    }))
    .run(client);
});
