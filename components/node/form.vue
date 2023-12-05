<template>
  <u-form :state="{}">
    <u-accordion :items="NodeFormItems">
      <template #default="{ item }">
        <u-button class="my-2 !bg-primary/20 hover:!bg-primary/50">
          <icon :name="item.icon" class="text-primary" />
          <p class="text-primary">
            {{ $t(item.label) }}
          </p>
        </u-button>
      </template>
      <template #root>
        <item-form v-model="innerValue.item" />
      </template>
      <template #details>
        <details-form v-model="innerValue.item" />
      </template>
      <template #position>
        <u-input v-model="innerValue.position" />
      </template>
      <template #children>
        <node-select v-model="innerValue.children" />
      </template>
    </u-accordion>
  </u-form>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: Object as PropType<INode>, required: true },
});

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: INode) => emit("update:modelValue", value),
});
</script>
