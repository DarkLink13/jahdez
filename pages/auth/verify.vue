<template>
  <div class="login">
    <EdgeDbAuthEmailVerify v-slot="{ loading }" redirect-to="/admin">
      <UCard>
        <template #header>
          <h2>Email verification</h2>
        </template>
        <UButton :loading="loading"> Loading... </UButton>
      </UCard>
    </EdgeDbAuthEmailVerify>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "auth",
  middleware: "guest",
});
</script>
