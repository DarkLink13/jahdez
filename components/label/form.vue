<template>
  <u-form :state="{}" class="space-y-2">
    <div class="flex flex-row gap-2">
      <component
        :is="input ? UInput : UTextarea"
        v-model="innerValue.en"
        placeholder="Value EN"
      />
      <component
        :is="input ? UInput : UTextarea"
        v-model="innerValue.es"
        placeholder="Value ES"
      />
      <u-button label="Same" @click="innerValue.es = innerValue.en" />
    </div>
    <div v-if="input" class="flex flex-row gap-2">
      <u-input v-model="innerValue.subvalue" placeholder="Sub Value" />
      <u-select
        v-model="innerValue.type"
        :options="Object.values(NodeItemLabelType)"
        placeholder="Type"
      />
    </div>
    <div v-if="input" class="flex flex-row gap-2">
      <u-input v-model="innerValue.size" placeholder="Size" />
      <u-input v-model="innerValue.color" placeholder="Color" />
      <u-input v-model="innerValue.bottom" placeholder="Bottom" />
    </div>
  </u-form>
</template>

<script lang="ts" setup>
import { UInput, UTextarea } from "#components";
import type { PropType } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  input: { type: Boolean, default: true },
  modelValue: { type: Object as PropType<INodeItemLabel>, default: () => ({}) },
});

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: INodeItemLabel) => emit("update:modelValue", value),
});
</script>
