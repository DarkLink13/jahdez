import workEn from "~/i18n/tree/work/en.json";
import workEs from "~/i18n/tree/work/es.json";
import { NodeItemType } from "~/types/node/item/type";
import { NodeItemLabelType } from "~/types/node/item/label/type";

export type GraphLocale = "en" | "es";

export interface IGraphNode extends Omit<INode, "children" | "parent"> {
  children: IGraphNode[];
}

type FlatNode = Omit<INode, "children" | "parent"> & {
  children: { id: string }[];
};

export const useGraph = async () => {
  const { data, error } = await useFetch<FlatNode[]>("/api/node/tree");

  const byId = computed(() => {
    const map = new Map<string, IGraphNode>();
    for (const node of data.value ?? []) map.set(node.id, { ...node, children: [] });
    for (const node of data.value ?? []) {
      map.get(node.id)!.children = node.children
        .map(({ id }) => map.get(id))
        .filter((child): child is IGraphNode => !!child)
        .sort((a, b) => a.position - b.position);
    }
    return map;
  });

  const nodes = computed(() => [...byId.value.values()]);
  const root = computed(() => nodes.value.find((node) => node.position === -1));
  const section = (name: string) =>
    root.value?.children.find((child) => child.item.label?.en === name);
  const ofType = (type: NodeItemType) =>
    nodes.value.filter((node) => node.item.type === type);

  return { data, error, nodes, root, section, ofType };
};

export const nodeText = (label: INodeItemLabel | INodeItemDescription | undefined, locale: GraphLocale) =>
  label?.[locale] ?? label?.en ?? "";

export const nodeSublabel = (item: INodeItem, type: NodeItemLabelType) =>
  item.sublabels?.find((label) => label.type === type);

// Dates come as "2021-11" (year-month) or "21-09-2022" / "10-2017" (day-month-year).
const parseDate = (value: string) => {
  const parts = value.trim().split("-").map(Number);
  if (parts[0] > 999) return new Date(parts[0], (parts[1] ?? 1) - 1, 1);
  const [year, month] = [parts[parts.length - 1], parts[parts.length - 2]];
  return new Date(year, (month ?? 1) - 1, parts.length === 3 ? parts[0] : 1);
};

const formatMonth = (value: string, locale: GraphLocale) =>
  parseDate(value).toLocaleDateString(locale, { month: "short", year: "numeric" });

export const nodePeriod = (item: INodeItem, locale: GraphLocale, present: string) => {
  const since = nodeSublabel(item, NodeItemLabelType.Since)?.en;
  if (since) return { start: parseDate(since), end: Infinity, text: `${formatMonth(since, locale)} – ${present}` };
  const date = nodeSublabel(item, NodeItemLabelType.Date)?.en;
  if (!date) return undefined;
  const [from, to] = date.split(",");
  return {
    start: parseDate(from),
    end: parseDate(to ?? from).getTime(),
    text: to
      ? `${formatMonth(from, locale)} – ${formatMonth(to, locale)}`
      : formatMonth(from, locale),
  };
};

// Country sublabels use "dr" for the Dominican Republic instead of the ISO code.
const regionCodes: Record<string, string> = { dr: "DO" };
export const nodeCountry = (item: INodeItem, locale: GraphLocale) => {
  const code = nodeSublabel(item, NodeItemLabelType.Country)?.en;
  if (!code) return "";
  try {
    return (
      new Intl.DisplayNames([locale], { type: "region" }).of(
        regionCodes[code] ?? code.toUpperCase(),
      ) ?? code
    );
  } catch {
    return code;
  }
};

const key = (value = "") =>
  value
    .toLowerCase()
    .replace(/developer/g, "")
    .replace(/[^a-z0-9]/g, "");

// Role achievements only live in i18n/tree/work, keyed by project and role,
// e.g. work.opsecsecurity.ere.fullstack. Projects are found at any depth since
// the company keys don't always match the node labels (UCI, freelance work).
// Many projects have no position nodes in the database, so when `roles` is
// empty every role written for the project in i18n is returned.
export const projectRoles = (project: string, roles: string[], locale: GraphLocale) => {
  const find = (tree: any): any => {
    if (!tree || typeof tree !== "object") return undefined;
    if (tree[key(project)]) return tree[key(project)];
    for (const child of Object.values(tree)) {
      const found = find(child);
      if (found) return found;
    }
  };
  const known = Object.entries(find(locale === "es" ? workEs : workEn) ?? {})
    .filter(([, value]) => (value as any)?.label)
    .map(([id, value]) => ({ id, ...(value as { label: string; description?: string }) }));
  if (!roles.length) return known;
  return roles.map((label) => ({
    id: key(label),
    label,
    description: known.find(({ id }) => id === key(label))?.description,
  }));
};
