<template>
  <u-form :state="{}" class="row row-col space-y-5">
    <u-textarea
      placeholder="Style"
      v-if="typeof innerValue.style === 'string'"
      v-model="innerValue.style"
    />
    <u-textarea
      placeholder="Details"
      v-if="innerValue.details"
      v-model="innerValue.details.text"
    />
    <icon-form v-model="innerValue.icon" placeholder="Icon" />
    <u-textarea v-model="innerValue.description" placeholder="Description" />
    <background-form v-model="innerValue.background" placeholder="Background" />
    <colors-form v-model="innerValue.colors" placeholder="Colors" />
  </u-form>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: Object as PropType<INodeItem>, required: true },
});
const emit = defineEmits(["update:modelValue"]);

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: INodeItem) => emit("update:modelValue", value),
});
</script>
