<template>
  <u-form :state="{}" class="flex flex-row w-full gap-2">
    <u-input v-model="innerValue.blur" placeholder="Blur" class="basis-1/2" />
    <u-input v-model="innerValue.color" placeholder="Color" class="basis-1/2" />
  </u-form>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Object as PropType<INodeItemColorGlow>,
    default: () => ({}),
  },
});

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: INodeItemColorGlow) => emit("update:modelValue", value),
});
</script>
