import type { AccordionItem } from "@nuxt/ui/dist/runtime/types";

export const NodeFormItems: AccordionItem[] = [
  {
    label: "api.node.form.item.label",
    slot: "root",
    defaultOpen: true,
    icon: "fluent:hexagon-32-regular",
  },
  {
    label: "api.node.form.details.label",
    slot: "details",
    icon: "fluent:text-description-32-filled",
  },
  {
    label: "api.node.form.position.label",
    slot: "position",
    icon: "fluent:briefcase-32-regular",
  },
  {
    label: "api.node.form.children.label",
    slot: "children",
    icon: "fluent:hexagon-three-20-regular",
  },
];
