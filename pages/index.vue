<template>
  <div class="w-full h-full flex items-center justify-center">
    <node
      :item="data?.item"
      :style="{
        transform: `
        translate(${translateEventX * 2}px, ${translateEventY * 2}px)`,
      }"
      root
    />
    <node
      v-for="child of data?.children"
      :item="child?.item"
      :style="{
        zIndex: 16 - child.position,
        transform: `
          translate(
            ${translateX(child.position, windowRatio) + translateEventX}px, 
            ${translateY(child.position, windowRatio) + translateEventY}px) `,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "circuit",
});
const { beta, gamma } = useDeviceOrientation();
const { height, width } = useWindowSize();
const { x: mouseX, y: mouseY } = useMouse();
const root = "root";

const { data } = useFetch(`/api/node/${root}`);
const x = computed(() => {
  if (gamma.value) return gamma.value * -20;
  return mouseX.value;
});
const y = computed(() => {
  if (beta.value) return beta.value * -20;
  return mouseY.value;
});
const translateEventX = computed(() => (-x.value / width.value) * 5);
const translateEventY = computed(() => (-y.value / height.value) * 5);

const windowRatio = computed(() => Math.min(width.value, height.value));
</script>
