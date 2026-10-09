<template>
  <div class="pdf-page min-h-screen bg-gray-100 text-gray-900">
    <PdfToolbar />

    <p v-if="error" class="p-8 text-center text-red-600">
      {{ $t("pdf.loadError") }}
    </p>

    <article
      v-else-if="root"
      class="sheet mx-auto my-6 max-w-[210mm] bg-white px-[14mm] py-[12mm] shadow-xl"
    >
      <header class="flex flex-col gap-1 border-b-2 border-gray-900 pb-3">
        <h1 class="text-3xl font-bold tracking-tight">
          Jorge Amado Hernández Betancourt
        </h1>
        <p class="text-lg text-gray-700">
          {{ $t("pdf.title") }} · {{ $t("pdf.years", { years }) }}
        </p>
        <ul class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <li v-for="contact in contacts" :key="contact.href">
            <a :href="contact.href" class="text-blue-700">
              {{ contact.text }}
            </a>
          </li>
        </ul>
      </header>

      <section class="mt-4">
        <h2 class="section-title">{{ $t("pdf.experience") }}</h2>
        <div
          v-for="work in experience"
          :key="work.id"
          class="mt-3 first:mt-0"
        >
          <div class="flex items-baseline justify-between gap-4">
            <h3 class="text-base font-semibold">
              <a v-if="work.href" :href="work.href" class="text-gray-900">
                {{ work.name }}
              </a>
              <template v-else>{{ work.name }}</template>
            </h3>
            <span class="shrink-0 text-sm text-gray-600">{{ work.period }}</span>
          </div>
          <p v-if="work.meta" class="text-sm text-gray-600">{{ work.meta }}</p>

          <div
            v-for="project in work.projects"
            :key="project.id"
            class="entry mt-2 border-l-2 border-gray-200 pl-3"
          >
            <div class="flex items-baseline justify-between gap-4">
              <p class="text-sm">
                <span class="font-semibold">{{ project.name }}</span>
                <span v-if="project.roles" class="text-gray-600">
                  · {{ project.roles }}
                </span>
              </p>
              <span class="shrink-0 text-xs text-gray-500">
                {{ project.period }}
              </span>
            </div>
            <ul class="mt-1 list-disc pl-4 text-[13px] leading-snug text-gray-800">
              <li v-for="(line, i) in project.lines" :key="i">{{ line }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="mt-5">
        <h2 class="section-title">{{ $t("pdf.skills") }}</h2>
        <ul class="flex flex-wrap gap-1.5">
          <li
            v-for="skill in skills"
            :key="skill.id"
            class="rounded border px-2 py-0.5 text-xs"
            :style="{ borderColor: skill.color }"
          >
            <span class="font-medium">{{ skill.name }}</span>
            <span v-if="skill.years" class="text-gray-500">
              · {{ $t("pdf.years_short", { n: skill.years }) }}
            </span>
          </li>
        </ul>
        <p v-if="algorithms.length" class="mt-2 text-xs text-gray-700">
          <span class="font-semibold">{{ $t("pdf.algorithms") }}:</span>
          {{ algorithms.join(", ") }}
        </p>
      </section>

      <section class="mt-5">
        <h2 class="section-title">{{ $t("pdf.certifications") }}</h2>
        <div v-for="issuer in certifications" :key="issuer.id" class="entry mt-2">
          <p class="text-sm font-semibold">{{ issuer.name }}</p>
          <ul class="text-[13px] text-gray-800">
            <li
              v-for="cert in issuer.items"
              :key="cert.id"
              class="flex justify-between gap-4"
            >
              <a v-if="cert.href" :href="cert.href" class="text-blue-700">
                {{ cert.name }}
              </a>
              <span v-else>{{ cert.name }}</span>
              <span class="shrink-0 text-xs text-gray-500">{{ cert.date }}</span>
            </li>
          </ul>
        </div>
      </section>
    </article>
  </div>
</template>

<script lang="ts" setup>
import skillTree from "~/i18n/tree/skill/en.json";

definePageMeta({ layout: false });

const { locale, t } = useI18n();
const lang = computed(() => locale.value as GraphLocale);
const { root, section, ofType, error } = await useGraph();

useHead({
  title: () => `Jorge Amado Hernández – ${t("pdf.cv")}`,
  // Per page, since route styles end up global and the graph prints landscape.
  style: [{ innerHTML: "@page { size: A4 portrait; margin: 12mm 14mm; }" }],
});

const years = Math.floor(
  (Date.now() - new Date(2018, 8, 1).getTime()) / (365.25 * 24 * 3600 * 1000),
);

const link = (item: INodeItem) =>
  item.label?.type === NodeItemLabelType.Link
    ? item.label.subvalue
    : nodeSublabel(item, NodeItemLabelType.Link)?.subvalue;

const contacts = computed(() =>
  (section("Contact")?.children ?? [])
    .map(({ item }) => {
      const label = nodeSublabel(item, NodeItemLabelType.Link);
      return { text: label?.[lang.value] ?? label?.en ?? "", href: label?.subvalue ?? "" };
    })
    .filter((contact) => contact.href && !contact.href.includes("instagram")),
);

const workMeta = (item: INodeItem) => {
  const type = nodeSublabel(item, NodeItemLabelType.WorkType);
  return [
    nodeCountry(item, lang.value),
    type?.en && t(`pdf.workType.${type.en}`),
    type?.subvalue && t(`pdf.workType.${type.subvalue}`),
  ]
    .filter(Boolean)
    .join(" · ");
};

// Achievements are written as paragraphs or "- " bullets; each becomes a line.
const lines = (value?: string) =>
  (value ?? "")
    .split("\n")
    .map((line) => line.trim().replace(/^-\s*/, ""))
    .filter(Boolean);

const experience = computed(() =>
  (section("Works")?.children ?? [])
    .map((work) => {
      const workPeriod = nodePeriod(work.item, lang.value, t("pdf.present"));
      return {
        id: work.id,
        name: nodeText(work.item.label, lang.value),
        href: link(work.item),
        period: workPeriod?.text ?? "",
        start: workPeriod?.start.getTime() ?? 0,
        end: workPeriod?.end ?? 0,
        meta: workMeta(work.item),
        projects: work.children
          .map((project) => {
            const name = nodeText(project.item.label, lang.value);
            const roles = project.children
              .filter((child) => child.item.type === NodeItemType.Position)
              .map((role) => nodeText(role.item.label, lang.value));
            const known = projectRoles(name, [...new Set(roles)], lang.value);
            const achievements = known.flatMap((role) => lines(role.description));
            const projectPeriod = nodePeriod(project.item, lang.value, t("pdf.present"));
            return {
              id: project.id,
              name,
              roles: known.map((role) => role.label).join(", "),
              period: projectPeriod?.text ?? "",
              start: projectPeriod?.start.getTime() ?? 0,
              lines: achievements.length
                ? achievements
                : lines(nodeText(project.item.description, lang.value)),
            };
          })
          .sort((a, b) => b.start - a.start),
      };
    })
    // Current jobs first, then by when they ended and started.
    .sort((a, b) => b.end - a.end || b.start - a.start),
);

const algorithmLabels = new Set(
  Object.entries(skillTree.algorithmsdev)
    .filter(([key]) => key !== "label" && key !== "description")
    .map(([, value]) => (value as { label: string }).label),
);
const allSkills = computed(() =>
  ofType(NodeItemType.Skill)
    .map(({ id, item }) => ({
      id,
      name: nodeText(item.label, lang.value),
      en: item.label?.en ?? "",
      years: nodeSublabel(item, NodeItemLabelType.Years)?.en,
      exp: item.exp ?? 0,
      color: item.colors?.secondary ?? "#d1d5db",
    }))
    .sort((a, b) => b.exp - a.exp || a.name.localeCompare(b.name)),
);
const skills = computed(() => allSkills.value.filter((s) => !algorithmLabels.has(s.en)));
const algorithms = computed(() =>
  allSkills.value.filter((s) => algorithmLabels.has(s.en)).map((s) => s.name),
);

const certifications = computed(() =>
  (section("Certifications")?.children ?? []).map((issuer) => ({
    id: issuer.id,
    name: nodeText(issuer.item.label, lang.value),
    items: issuer.children.map(({ id, item }) => ({
      id,
      name: nodeText(item.label, lang.value),
      href: nodeSublabel(item, NodeItemLabelType.Link)?.subvalue,
      date: nodeSublabel(item, NodeItemLabelType.Date)?.en ?? "",
    })),
  })),
);
</script>

<style>
.section-title {
  @apply mb-2 border-b border-gray-300 pb-0.5 text-sm font-bold uppercase tracking-widest text-gray-700;
}

@media print {
  .no-print {
    display: none !important;
  }
  .pdf-page {
    background: white !important;
  }
  .pdf-page .sheet {
    margin: 0;
    padding: 0;
    max-width: none;
    box-shadow: none;
  }
  .pdf-page .entry {
    break-inside: avoid;
  }
  .pdf-page h2 {
    break-after: avoid;
  }
  .pdf-page a {
    text-decoration: none;
  }
}
</style>
