<template>
  <u-form :state="{}">
    <u-form-group label="Colors" required>
      <div class="flex flex-row gap-2">
        <u-input v-model="innerValue.primary" placeholder="Primary" />
        <u-input v-model="innerValue.secondary" placeholder="Secondary" />
        <u-input v-model="innerValue.hover" placeholder="Hover" />
      </div>
    </u-form-group>
    <u-form-group label="Glow" class="mt-2">
      <div class="space-y divide-y divide-gray-600">
        <div
          v-for="(_, index) in innerValue.glow"
          class="py-2 flex items-center"
        >
          <colors-glow-form
            v-if="innerValue.glow"
            v-model="innerValue.glow[index]"
          />
          <u-button
            icon="i-fluent-delete-32-regular"
            color="red"
            :ui="{ rounded: 'rounded-full' }"
            class="h-8 w-8 ml-2"
            variant="ghost"
          />
        </div>
      </div>
      <u-button
        label="Add Glow"
        @click="addGlow"
        icon="i-fluent-add-circle-32-regular"
      />
    </u-form-group>
  </u-form>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: Object as PropType<INodeItemColor>, default: () => ({}) },
});
const addGlow = () => {
  !innerValue.value.glow && (innerValue.value.glow = []);
  innerValue?.value.glow?.push({ blur: 0, color: "" });
};
const innerValue = computed({
  get: () => props.modelValue,
  set: (value: INodeItemColor) => emit("update:modelValue", value),
});
</script>
