<template>
  <tree-transition :index="index" :enter="enter">
    <tree
      v-if="data"
      v-model="data"
      @go-child="goChild"
      @go-parent="goParent"
    />
  </tree-transition>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "circuit",
});
const { setLocale } = useI18n();
const mode = useColorMode();

const route = useRoute();
const router = useRouter();

const colors = useState<IColorConfig>("colors", () => ({}));

const index = useState(() => 0);
const enter = useState(() => false);
const url = computed(() => `/api/node/${route.params.node}`);

const { data } = useFetch<INode>(url.value, {
  async onResponse({ response }) {
    colors.value = getColors(response._data);
  },
  onResponseError() {
    return router.push("/node/root");
  },
});

const goParent = () => {
  index.value = data?.value?.position ?? 0;
  enter.value = false;
  router.push(
    !data?.value?.parent?.[0] || data?.value?.parent?.[0]?.position === -1
      ? "root"
      : data?.value?.parent?.[0]?.id,
  );
};

const goChild = (child: INode) => {
  if (child.item.action && child.item.mode) {
    if (["es", "en"].includes(child.item?.mode ?? "")) {
      child.item.mode && setLocale(child.item.mode);
    } else {
      mode.value = child.item.mode;
    }
    return;
  } else {
    index.value = child.position;
    enter.value = true;
    router.push(child.id);
  }
};
</script>
