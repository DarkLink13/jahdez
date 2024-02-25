import e, { createClient } from "./query-builder";
import seeds from "./seed.json";
async function main() {
  const client = createClient();
  for (const seed in seeds) {
    for (const index in seeds[seed]) {
      const node = seeds[seed][index];
      e.params(
        {
          sublabels: e.array(
            e.tuple({
              type: e.LabelType,
              subvalue: e.str,
              es: e.str,
              en: e.str,
            }),
          ),
        },
        (params) => {
          const sublabels = e.for(e.array_unpack(params.sublabels), (item) => {
            return e.insert(e.Label, item);
          });

          return e.insert(e.Node, {
            item: e.insert(e.Item, {
              ...node.item,
              ...(node.item.description
                ? {
                    description: e.insert(e.Description, node.item.description),
                  }
                : {}),
              ...(node.item.background
                ? {
                    background: e.insert(e.Background, node.item.background),
                  }
                : {}),
              ...(node.item.colors
                ? {
                    colors: e.insert(e.Color, node.item.colors),
                  }
                : {}),
              ...(node.item.icon
                ? {
                    icon: e.insert(e.Icon, node.item.icon),
                  }
                : {}),
              ...(node.item.label
                ? { label: e.insert(e.Label, node.item.label) }
                : {}),
              sublabels,
            }),
            position: node.position,
            style: node.style,
          });
        },
      ).run(client, {
        sublabels:
          node.item.sublabels?.map((label) => ({
            ...label,
            subvalue: label.subvalue ?? "",
          })) || [],
      });
    }
  }
}

main();
