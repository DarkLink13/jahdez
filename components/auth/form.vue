<template>
  <UCard class="w-full max-w-sm shadow-lg">
    <template #header>
      <div class="flex flex-col items-center gap-2 text-center">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-950"
        >
          <UIcon :name="headerIcon" class="h-6 w-6 text-primary-500" />
        </div>
        <h2 class="text-xl font-semibold">{{ $t(`auth.${mode}.title`) }}</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ $t(`auth.${mode}.subtitle`) }}
        </p>
      </div>
    </template>

    <UAlert
      v-if="success"
      icon="i-fluent-mail-checkmark-24-regular"
      color="green"
      variant="soft"
      :title="$t('auth.signup.successTitle')"
      :description="$t('auth.signup.successDescription', { email: state.email })"
    />

    <UForm
      v-else
      :state="state"
      :validate="validateForm"
      class="flex flex-col gap-4"
      @submit="onSubmit"
    >
      <UAlert
        v-if="error"
        icon="i-fluent-error-circle-24-regular"
        color="red"
        variant="soft"
        :title="$t(`auth.${mode}.error`)"
        :description="error"
        :close-button="{
          icon: 'i-fluent-dismiss-24-regular',
          color: 'red',
          variant: 'link',
          padded: false,
        }"
        @close="error = ''"
      />

      <UFormGroup :label="$t('auth.email')" name="email">
        <UInput
          v-model="state.email"
          type="email"
          autocomplete="email"
          placeholder="your@email.com"
          icon="i-fluent-mail-24-regular"
          size="lg"
          autofocus
        />
      </UFormGroup>

      <UFormGroup :label="$t('auth.password')" name="password">
        <UInput
          v-model="state.password"
          :type="showPassword ? 'text' : 'password'"
          :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
          placeholder="••••••••"
          icon="i-fluent-key-24-regular"
          size="lg"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              color="gray"
              variant="link"
              :padded="false"
              :icon="
                showPassword
                  ? 'i-fluent-eye-off-24-regular'
                  : 'i-fluent-eye-24-regular'
              "
              :aria-label="
                $t(showPassword ? 'auth.hidePassword' : 'auth.showPassword')
              "
              @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
      </UFormGroup>

      <UButton
        type="submit"
        size="lg"
        block
        :loading="loading"
        :trailing-icon="submitIcon"
        class="mt-2"
      >
        {{ $t(`auth.${mode}.submit`) }}
      </UButton>
    </UForm>

    <template #footer>
      <p class="text-center text-sm text-gray-500 dark:text-gray-400">
        {{ $t(mode === "login" ? "auth.login.noAccount" : "auth.signup.hasAccount") }}
        <ULink
          :to="mode === 'login' ? '/auth/signup' : '/auth/login'"
          class="font-medium text-primary-500 hover:underline"
        >
          {{ $t(`auth.${mode}.link`) }}
        </ULink>
      </p>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { AuthCredentials } from "~/composables/auth";

const props = withDefaults(
  defineProps<{ mode: "login" | "signup"; redirectTo?: string }>(),
  { redirectTo: "/admin" },
);

const { validate, errorMessage } = useAuthForm();
const { update } = useEdgeDbIdentity();

const state = reactive<AuthCredentials>({ email: "", password: "" });
const showPassword = ref(false);
const loading = ref(false);
const error = ref("");
const success = ref(false);

const validateForm = (s: AuthCredentials) =>
  validate(s, { minPasswordLength: props.mode === "signup" ? 8 : 0 });
const headerIcon = computed(() =>
  props.mode === "login"
    ? "i-fluent-lock-closed-24-regular"
    : "i-fluent-person-add-24-regular",
);
const submitIcon = computed(() =>
  props.mode === "login"
    ? "i-fluent-arrow-enter-24-regular"
    : "i-fluent-person-add-24-regular",
);

const onSubmit = async () => {
  if (loading.value) return;
  loading.value = true;
  error.value = "";
  try {
    const result = await $fetch<{ code?: string }>(`/api/auth/${props.mode}`, {
      method: "POST",
      body: { ...state, provider: "builtin::local_emailpassword" },
    });
    // Signup only returns a code when email verification is disabled;
    // otherwise the user has to follow the link sent by email first.
    if (props.mode === "signup" && !result?.code) {
      success.value = true;
      return;
    }
    await update();
    await navigateTo(props.redirectTo);
  } catch (e) {
    error.value = errorMessage(e);
  } finally {
    loading.value = false;
  }
};
</script>
