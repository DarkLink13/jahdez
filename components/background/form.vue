<template>
  <u-form :state="{}" class="flex flex-row gap-2">
    <u-form-group label="Background">
      <div class="flex flex-row gap-2 items-center">
        <u-input v-model="innerValue.src" placeholder="Src" class="basis-1/3" />
        <u-input
          v-model="innerValue.height"
          placeholder="Height"
          class="basis-1/3"
        />
        <u-input v-model="innerValue.x" placeholder="X" class="basis-1/6" />
        <u-input v-model="innerValue.y" placeholder="Y" class="basis-1/6" />
        <u-form-group label="Full">
          <u-toggle v-model="innerValue.full" />
        </u-form-group>
      </div>
    </u-form-group>
  </u-form>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: Object as PropType<IBackground>, default: () => ({}) },
});

const innerValue = computed({
  get: () => props.modelValue ?? { src: "" },
  set: (value: IBackground) => emit("update:modelValue", value),
});
</script>
