<template>
  <EdgeDbAuthEmailLogin
    v-slot="{ email, updateEmail, password, updatePassword, submit, loading }"
    redirect-to="/admin"
  >
    <UCard>
      <template #header>
        <h2>Login</h2>
      </template>
      <div class="flex flex-col gap-4">
        <UFormGroup label="Email">
          <UInput
            type="email"
            :value="email"
            placeholder="your@email.com"
            @change="(e) => updateEmail(e.target.value)"
          />
        </UFormGroup>
        <UFormGroup label="Password">
          <UInput
            type="password"
            :value="password"
            placeholder="password"
            @change="(e) => updatePassword(e.target.value)"
          />
        </UFormGroup>
      </div>

      <template #footer>
        <div class="flex items-center gap-2">
          <UButton
            type="button"
            :loading="loading"
            @click="async (e) => (await submit(), $router.push('/admin'))"
          >
            Login
          </UButton>

          <OAuthProviders />
        </div>
      </template>
    </UCard>
  </EdgeDbAuthEmailLogin>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "auth",
  middleware: "guest",
});
</script>
