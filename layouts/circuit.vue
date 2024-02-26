<template>
  <div
    class="overflow-hidden flex items-center h-full w-full absolute dark:bg-black bg-white justify-center"
  >
    <background
      v-bind="colorTheme"
      :style="{
        transform: `translate(${-x / width}px, ${-y / height}px)`,
        width: '100%',
      }"
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
const { x, y } = useMouse();
const { height, width } = useWindowSize();

const colorTheme = computed(() => ({
  primary: colorMode.value === "light" ? "#DDDDDD" : "#202020",
  secondary: colorMode.value === "light" ? "#DDDDDD20" : "#20202017",
}));
</script>
