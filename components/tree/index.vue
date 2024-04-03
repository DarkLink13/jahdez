<template>
  <div class="w-[500px] h-[500px] flex items-center justify-center relative">
    <node
      :item="modelValue?.item"
      :position="modelValue?.position"
      :id="modelValue?.id ?? ''"
      :style="{
        transform: `
        translate(${translateEventX * 2}px, ${translateEventY * 2}px)`,
      }"
      root
      @click="() => $emit('goParent')"
    />
    <node
      v-for="child of modelValue?.children"
      :id="child?.id"
      :key="child?.id"
      :item="child?.item"
      :position="child?.position"
      :style="{
        zIndex: 16 - child.position,
        transform: `
        translate(
          ${translateX(child.position, windowRatio) + translateEventX}px, 
          ${translateY(child.position, windowRatio) + translateEventY}px) `,
      }"
      @click="() => $emit('goChild', child)"
    />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["goChild", "goParent"]);
defineProps({
  modelValue: {
    type: Object as PropType<INode>,
    required: false,
  },
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
