<template>
  <div class="relative mt-1">
    <div id="donut"></div>
    <div class="absolute top-2 left-3" :style="{ color, fontWeight: 700 }">
      {{ modelValue }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  color: { type: String, default: "#fff" },
  modelValue: { type: Number, required: true },
});
const { value } = useColorMode();
const background = computed(() => (value === "dark" ? "#000" : "#fff"));
const radians = computed(() => `${360 - (props.modelValue / 100) * 360}deg`);
</script>
<style>
#donut {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: conic-gradient(
    var(--bg) 0deg v-bind(radians),
    v-bind(color) v-bind(radians) 360deg
  );
}

#donut::before {
  content: "";
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--bg);
}

#donut {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
