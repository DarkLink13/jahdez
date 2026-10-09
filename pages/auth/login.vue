<template>
  <AuthForm mode="login" />
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "auth",
  middleware: "guest",
});
</script>
