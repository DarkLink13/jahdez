<template>
  <u-form :state="{}" class="row row-col space-y-5">
    <u-form-group label="Core">
      <div class="flex flex-row items-center justify-between">
        <u-input placeholder="Exp" v-model="innerValue.exp" />
        <u-select
          placeholder="Type"
          v-model="innerValue.type"
          :options="Object.values(NodeItemType)"
        />
        <u-form-group label="Theme">
          <u-toggle
            v-model="theme"
            on-icon="i-fluent-weather-sunny-32-regular"
            off-icon="i-fluent-weather-moon-28-regular"
            :options="['dark', 'light']"
            placeholder="Mode"
          />
        </u-form-group>
        <u-form-group label="Has Action">
          <u-toggle
            v-if="typeof innerValue.action === 'boolean'"
            v-model="innerValue.action"
          />
        </u-form-group>
      </div>
    </u-form-group>
    <u-form-group label="Label">
      <label-form v-model="innerValue.label" />
    </u-form-group>
    <u-form-group label="Sub Labels">
      <div class="divide-y divide-gray-700 space-y-2">
        <div
          v-for="(label, index) in innerValue.sublabels"
          class="pt-2 flex flex-row items-center"
        >
          <label-form
            v-if="innerValue.sublabels"
            v-model="innerValue.sublabels[index]"
            :key="index"
          />
          <u-button
            icon="i-fluent-delete-32-regular"
            color="red"
            :ui="{ rounded: 'rounded-full' }"
            class="h-8 w-8 ml-2"
            variant="ghost"
          />
        </div>
        <u-button
          label="Add sublabel"
          icon="i-fluent-add-circle-32-regular"
          @click="addSublabel"
        />
      </div>
    </u-form-group>
  </u-form>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: Object as PropType<INodeItem>, required: true },
});
const theme = computed({
  get: () => props.modelValue.mode === "light",
  set: (value: boolean) => (innerValue.value.mode = value ? "light" : "dark"),
});
const addSublabel = () => {
  !innerValue.value.sublabels && (innerValue.value.sublabels = []);
  innerValue?.value.sublabels?.push({});
};
const innerValue = computed({
  get: () => props.modelValue,
  set: (value: INodeItem) => emit("update:modelValue", value),
});
</script>
