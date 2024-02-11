<template>
  <u-form :state="{}" class="flex flex-row gap-2">
    <u-form-group label="Icon" required>
      <div class="flex flex-row gap-2">
        <u-input v-model="innerValue.key" placeholder="Key" />
        <u-input v-model="innerValue.size" placeholder="Size" />
        <u-input v-model="innerValue.top" placeholder="Top" />
      </div>
    </u-form-group>
  </u-form>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: Object as PropType<IIcon>, default: () => ({}) },
});

const innerValue = computed({
  get: () => props.modelValue ?? { key: "", size: "", top: "" },
  set: (value: IIcon) => emit("update:modelValue", value),
});
</script>
