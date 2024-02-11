<template>
  <login></login>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "auth",
  middleware: "guest",
});
</script>
