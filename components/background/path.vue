<template>
  <path :fill="fill" :style="{ filter }" :d="BackgroundPath" />
</template>

<script lang="ts" setup>
defineProps({
  fill: { type: String, default: "" },
  filter: { type: String, default: "" },
});
</script>
