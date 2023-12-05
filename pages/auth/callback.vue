<template>
  <div class="callback">
    <EdgeDbOAuthCallback v-slot="{ loading }" redirect-to="/admin">
      <UCard>
        <template #header>
          <h2>OAuth callback</h2>
        </template>
        <UButton :loading="loading"> Loading... </UButton>
      </UCard>
    </EdgeDbOAuthCallback>
  </div>
</template>
