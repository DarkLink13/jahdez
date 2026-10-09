<template>
  <div
    class="no-print sticky top-0 z-10 flex flex-wrap items-center justify-center gap-2 border-b border-gray-200 bg-white/90 p-3 backdrop-blur"
  >
    <UButtonGroup size="sm">
      <UButton
        to="/pdf"
        :color="$route.path === '/pdf' ? 'primary' : 'white'"
        icon="i-fluent-document-text-24-regular"
      >
        {{ $t("pdf.cv") }}
      </UButton>
      <UButton
        to="/pdf/graph"
        :color="$route.path === '/pdf/graph' ? 'primary' : 'white'"
        icon="i-fluent-organization-24-regular"
      >
        {{ $t("pdf.graph") }}
      </UButton>
    </UButtonGroup>
    <UButtonGroup size="sm">
      <UButton
        v-for="code in ['en', 'es'] as const"
        :key="code"
        :color="locale === code ? 'primary' : 'white'"
        @click="setLocale(code)"
      >
        {{ code.toUpperCase() }}
      </UButton>
    </UButtonGroup>
    <UButton
      size="sm"
      icon="i-fluent-arrow-download-24-regular"
      @click="print"
    >
      {{ $t("pdf.download") }}
    </UButton>
  </div>
</template>

<script lang="ts" setup>
const { locale, setLocale } = useI18n();
// The browser's print dialog saves real text and working links, unlike a
// canvas snapshot; "Save as PDF" is its default destination.
const print = () => window.print();
</script>
