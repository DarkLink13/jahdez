<template>
  <div>
    <slot name="button" :click="click" />
    <u-modal v-model="isOpen">
      <u-card>
        <template #header> {{ $t(`api.node.form.${action}.label`) }} </template>
        <node-form v-model="innerValue" />
        <template #footer>
          <div class="flex flex-row justify-between">
            <u-button
              @click="
                () => {
                  isOpen = false;
                }
              "
              label="Close"
              color="red"
            />
            <u-button v-if="!disabled" @click="submit" label="Submit" />
          </div>
        </template>
      </u-card>
    </u-modal>
  </div>
</template>

<script lang="ts" setup>
const click = () => (isOpen.value = true);
const isOpen = ref(false);
const submit = () => {
  useFetch(props.id ? `/api/node/${props.id}` : "/api/node", {
    method: props.edit ? "PATCH" : "POST",
    body: innerValue.value,
  }).then(() => {
    props.refresh();
    isOpen.value = false;
  });
};

const emit = defineEmits(["update:modelValue"]);
const action = computed(() =>
  props.edit ? (props.disabled ? "view" : "edit") : "create",
);

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: INode) => emit("update:modelValue", value),
});

const props = defineProps({
  refresh: { type: Function, required: true },
  edit: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  id: { type: String, default: "" },
  modelValue: {
    type: Object as PropType<INode>,
    default: {
      item: {
        label: {
          es: "",
          en: "",
        },
        type: NodeItemType.Default,
        style: "",
        action: false,
        details: { text: "" },
      },
    },
  },
});
</script>
