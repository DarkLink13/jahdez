<template>
  <div class="w-full h-full flex items-center justify-center">
    <div
      class="bg-slate-50 text-black z-50 absolute h-0 w-[25%] pb-[25%] hex hover:w-[27%] hover:pb-[27%] transition-[width,padding] ease-in-out duration-75 shadow-2xl"
      :style="{
        transform: `
          translate(${translateEventX * 2}px, ${translateEventY * 2}px)`,
      }"
    ></div>
    <div
      v-for="i of [0, 1, 2, 3, 4, 5]"
      class="bg-slate-200 absolute h-0 w-[20%] pb-[20%] hex hover:w-[22%] hover:pb-[22%] transition-[width,padding] ease-in-out duration-75 hover:!z-40 !shadow-2xl"
      :style="{
        zIndex: 16 - i,
        transform: `
          translate(
            ${translateX(i, windowRatio) + translateEventX}px, 
            ${translateY(i, windowRatio) + translateEventY}px) `,
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

<style>
.hex {
  -webkit-clip-path: polygon(
    25% 5%,
    75% 5%,
    100% 50%,
    75% 95%,
    25% 95%,
    0% 50%
  );
  clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
}
</style>
