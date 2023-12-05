<template>
  <div>
    <u-select-menu
      v-model="innerValue"
      multiple
      :options="data?.map((node) => ({ id: node.id, label: node.item.en }))"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: Array<any>, default: () => [] },
});
const { data } = useFetch<INode[]>("/api/node");

const emit = defineEmits(["update:modelValue"]);

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: Array<any>) => emit("update:modelValue", value),
});
</script>
