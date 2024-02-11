<template>
  <EdgeDbAuthEmailLogin
    v-slot="{ email, updateEmail, password, updatePassword, submit, loading }"
    redirect-to="/"
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
            @click="!loading && submit()"
          >
            Login
          </UButton>
        </div>
      </template>
    </UCard>
    <EdgeDbAuthProviders v-slot="{ oAuthProviders: providers }">
      <!-- Create a OAuth button behavior from a provider name -->
      <EdgeDbOAuthButton
        v-for="provider of providers"
        :key="provider.name"
        v-slot="{ redirect }"
        :provider="provider.name"
      >
        <!-- Call `redirect` from the OAuthButton -->
        <button @click="() => redirect()">
          {{ provider.display_name }}
        </button>
      </EdgeDbOAuthButton>
    </EdgeDbAuthProviders>
  </EdgeDbAuthEmailLogin>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "auth",
  middleware: "guest",
});
</script>
