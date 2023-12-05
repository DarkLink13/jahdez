<template>
  <div class="h-screen flex">
    <div class="m-5 hidden md:block">
      <u-dropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
        class="z-50 mb-5"
      >
        <u-avatar icon="i-fluent-person-32-regular" />
        <template #account="{ item }">
          <div class="text-left overflow-hidden">
            <p>Signed in as</p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template>
        <template #logout="{ item }">
          <u-button
            @click="async () => (await logout(), $router.push('/auth/login'))"
          >
            <span class="truncate">{{ item.label }}</span>
            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </u-button>
        </template>
      </u-dropdown>
      <u-vertical-navigation
        class="bg-slate-600 p-2 z-40 rounded-lg"
        :links="links"
      />
    </div>
    <div class="w-full m-10">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { identity, logout } = useEdgeDbIdentity();
const items = [
  [
    {
      label: identity.value.id,
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-heroicons-cog-8-tooth",
      slot: "logout",
    },
  ],
];
const links = [
  {
    label: "Nodes",
    to: "/admin",
  },
];
</script>
