import { defineEventHandler } from "h3";

export default defineEventHandler(async () => {
  const client = useEdgeDb();
  const e = useEdgeDbQueryBuilder();
  return await e
    .select(e.Node, () => ({
      id: true,
      children: {
        item: {
          label: {
            es: true,
            en: true,
          },
        },
      },
      item: {
        label: {
          es: true,
          en: true,
        },
        type: true,
      },
    }))
    .run(client);
});
