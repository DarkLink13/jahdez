<template>
  <AuthForm mode="signup" />
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "auth",
  middleware: "guest",
});
</script>
