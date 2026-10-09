<template>
  <div class="pdf-graph min-h-screen bg-gray-100 text-gray-900">
    <PdfToolbar />

    <p v-if="error" class="p-8 text-center text-red-600">
      {{ $t("pdf.loadError") }}
    </p>
    <p v-else-if="!start" class="p-8 text-center text-red-600">
      {{ $t("pdf.notFound") }}
    </p>

    <template v-else>
      <section
        v-for="page in pages"
        :key="page.node.id"
        class="sheet mx-auto my-6 flex h-[190mm] w-[277mm] gap-6 overflow-hidden bg-white p-6 shadow-xl"
      >
        <div class="relative h-full flex-1">
          <PdfHex
            :item="page.node.item"
            :locale="lang"
            :size="HEX"
            :style="place(CENTER.x, CENTER.y)"
          />
          <PdfHex
            v-for="child in page.node.children"
            :key="child.id"
            :item="child.item"
            :locale="lang"
            :size="HEX"
            :style="
              place(
                CENTER.x + translateX(child.position, RADIUS),
                CENTER.y + translateY(child.position, RADIUS),
              )
            "
          />
        </div>
        <aside class="flex w-[75mm] flex-col gap-2 border-l border-gray-200 pl-5">
          <p class="text-xs uppercase tracking-widest text-gray-500">
            {{ page.path.join(" › ") }}
          </p>
          <h2 class="text-2xl font-bold">
            {{ nodeText(page.node.item.label, lang) }}
          </h2>
          <p v-if="facts(page.node.item)" class="text-sm text-gray-600">
            {{ facts(page.node.item) }}
          </p>
          <p
            v-if="page.node.item.description"
            class="text-[13px] leading-snug text-gray-700"
          >
            {{ nodeText(page.node.item.description, lang) }}
          </p>
        </aside>
      </section>

      <section
        v-for="group in detached"
        :key="group.title"
        class="sheet mx-auto my-6 w-[277mm] bg-white p-6 shadow-xl"
      >
        <h2 class="mb-1 text-xl font-bold">{{ group.title }}</h2>
        <p class="mb-4 text-xs text-gray-500">{{ $t("pdf.detached") }}</p>
        <div class="flex flex-wrap gap-x-2 gap-y-1">
          <div
            v-for="node in group.nodes"
            :key="node.id"
            class="relative"
            :style="{ width: `${SMALL}px`, height: `${SMALL * 1.15}px` }"
          >
            <PdfHex :item="node.item" :locale="lang" :size="SMALL" />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { NodeItemType } from "~/types/node/item/type";

definePageMeta({ layout: false });

const HEX = 132;
const SMALL = 104;
// Same ring layout as the live tree: neighbours sit one hexagon width apart.
const RADIUS = (HEX + 10) * 3;
const CENTER = { x: 330, y: 340 };

const { locale, t } = useI18n();
const lang = computed(() => locale.value as GraphLocale);
const { root, nodes, error } = await useGraph();

const route = useRoute();
const router = useRouter();
// /pdf/graph exports everything; /pdf/graph/<id> only that node and below.
const nodeId = computed(() => (route.params.node as string) || undefined);
const start = computed(() =>
  nodeId.value ? nodes.value.find((node) => node.id === nodeId.value) : root.value,
);

useHead({
  title: () =>
    `Jorge Amado Hernández – ${
      nodeId.value && start.value ? nodeText(start.value.item.label, lang.value) : t("pdf.graph")
    }`,
  // Per page, since route styles end up global and the résumé prints portrait.
  style: [{ innerHTML: "@page { size: A4 landscape; margin: 10mm; }" }],
});

const place = (x: number, y: number) => ({
  left: `${x - HEX / 2}px`,
  top: `${y - (HEX * 1.15) / 2}px`,
});

const facts = (item: INodeItem) => {
  const type = nodeSublabel(item, NodeItemLabelType.WorkType);
  return [
    nodePeriod(item, lang.value, t("pdf.present"))?.text,
    nodeCountry(item, lang.value),
    type?.en && t(`pdf.workType.${type.en}`),
    type?.subvalue && t(`pdf.workType.${type.subvalue}`),
    nodeSublabel(item, NodeItemLabelType.Years)?.[lang.value],
  ]
    .filter(Boolean)
    .join(" · ");
};

// One page per node with children, in reading order. Nodes reached twice
// (shared positions) get a single page; the theme/language switches are UI.
// Labels from the root down to the export's starting node, for its breadcrumb.
const ancestors = (target: IGraphNode) => {
  const seen = new Set<string>();
  const walk = (node: IGraphNode, path: string[]): string[] | undefined => {
    if (node.id === target.id) return path;
    if (seen.has(node.id)) return;
    seen.add(node.id);
    const label = nodeText(node.item.label, lang.value);
    for (const child of node.children) {
      const found = walk(child, [...path, label]);
      if (found) return found;
    }
  };
  return (root.value && walk(root.value, [])) ?? [];
};

const pages = computed(() => {
  const result: { node: IGraphNode; path: string[] }[] = [];
  const seen = new Set<string>();
  const visit = (node: IGraphNode, path: string[]) => {
    if (seen.has(node.id)) return;
    seen.add(node.id);
    const children = node.children.filter((child) => !child.item.action);
    // A leaf only gets a page when it is the node being exported.
    if (!children.length && node.id !== start.value?.id) return;
    result.push({ node: { ...node, children }, path });
    const label = nodeText(node.item.label, lang.value);
    children.forEach((child) => visit(child, [...path, label]));
  };
  if (start.value) visit(start.value, ancestors(start.value));
  return result.filter(
    ({ node }) => node.id === start.value?.id || node.item.label?.en !== "Info",
  );
});

const reachable = computed(() => {
  const ids = new Set<string>();
  const walk = (node: IGraphNode) => {
    if (ids.has(node.id)) return;
    ids.add(node.id);
    node.children.forEach(walk);
  };
  if (root.value) walk(root.value);
  return ids;
});

const typeTitles: Partial<Record<NodeItemType, string>> = {
  [NodeItemType.Skill]: "pdf.skills",
  [NodeItemType.Work]: "pdf.experience",
  [NodeItemType.Project]: "pdf.projects",
  [NodeItemType.Position]: "pdf.positions",
  [NodeItemType.Like]: "pdf.likes",
};

// Only the full export lists nodes that are not linked from the root.
const detached = computed(() => {
  if (nodeId.value) return [];
  const groups = new Map<NodeItemType, IGraphNode[]>();
  for (const node of nodes.value) {
    if (reachable.value.has(node.id) || !typeTitles[node.item.type]) continue;
    groups.set(node.item.type, [...(groups.get(node.item.type) ?? []), node]);
  }
  return [...groups.entries()].map(([type, list]) => ({
    title: t(typeTitles[type]!),
    nodes: list.sort(
      (a, b) =>
        (b.item.exp ?? 0) - (a.item.exp ?? 0) ||
        nodeText(a.item.label, lang.value).localeCompare(nodeText(b.item.label, lang.value)),
    ),
  }));
});

// Arriving from a right click on a node (?print=1) opens the print dialog once
// images, icons and fonts are in, then drops the flag so a reload won't reprint.
onMounted(async () => {
  if (!route.query.print) return;
  await document.fonts.ready;
  await Promise.all(
    [...document.images].map((img) =>
      img.complete
        ? undefined
        : new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          }),
    ),
  );
  await new Promise((resolve) => setTimeout(resolve, 500));
  await router.replace({ query: {} });
  window.print();
});
</script>

<style>
@media print {
  .no-print {
    display: none !important;
  }
  .pdf-graph {
    background: white !important;
  }
  .pdf-graph .sheet {
    margin: 0;
    box-shadow: none;
    break-after: page;
  }
  .pdf-graph .sheet:last-child {
    break-after: auto;
  }
}
</style>
