<template>
  <div
    ref="node"
    :key="id"
    :class="`wrapper absolute w-[22vh] h-[25vh] hover:w-[25vh] hover:h-[28vh] z-50 aspect-square
    transition-[height,width] ease-in-out duration-75 shadow-2xl`"
  >
    <div
      :class="`hex absolute ${
        item.mode === 'dark'
          ? 'bg-black'
          : item.mode === 'light'
            ? 'bg-stone-100'
            : 'dark:bg-black bg-stone-100'
      }`"
    >
      <div
        class="flex items-center justify-center w-full h-full absolute flex-col"
      >
        <div class="h-[25%] justify-end flex flex-col w-full items-center">
          <img
            v-if="item.background"
            :src="backgroundResponsive"
            :class="
              root
                ? position === -1
                  ? 'w-full absolute bottom-0'
                  : `h-[50%]`
                : 'h-full'
            "
          />
          <icon
            v-if="item.icon"
            :name="item.icon?.key"
            :size="item?.description ? '30%' : '100%'"
            :color="item?.colors?.primary"
          />
          <div
            class="uppercase text-center h-6 overflow-hidden"
            :class="position === -1 && 'absolute bottom-7'"
            :style="{
              color: item?.colors?.primary,
              fontWeight: 800,
              fontSize: item?.description ? '90%' : '90%',
            }"
          >
            {{ item?.label?.[$i18n.locale as "es" | "en"] }}
          </div>
          <div v-if="item.sublabels" class="text-[10px] opacity-30 text-wrap">
            {{
              item.sublabels
                .map((label) => label?.[$i18n.locale as "es" | "en"])
                .join(" | ")
            }}
          </div>
        </div>
        <div
          v-if="item?.description"
          class="hexagon-content p-2 dark:text-white text-black opacity-50 text-[90%] h-[50%] text-justify overflow-y-scroll"
        >
          {{ item?.description?.[$i18n.locale as "es" | "en"] }}
        </div>
        <div
          v-if="item.exp || item?.description"
          class="h-[25%] w-full flex flex-row justify-center"
        >
          <b-chart
            v-if="item.exp"
            v-model="item.exp"
            :color="item?.colors?.primary"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const mode = useColorMode();
const props = defineProps({
  id: { type: String, required: true },
  position: { type: Number, required: true },
  root: { type: Boolean, default: false },
  item: { type: Object as PropType<INodeItem>, required: true },
});

const backgroundResponsive = computed(() =>
  props.item.background?.src.replace(
    ".png",
    (width.value < 800 ? "48" : "256") + ".png",
  ),
);

const backgroundBorder = computed(() =>
  mode.value === "dark" ? "#090909" : "#e9e9e9",
);
const node = ref<HTMLElement | null>(null);
const { x: mouseX, y: mouseY } = useMouse();
const { width, height } = useWindowSize();
const x = computed(() => Math.ceil((mouseX.value / width.value) * 100) + "%");
const y = computed(() => Math.ceil((mouseY.value / height.value) * 100) + "%");
computed(() =>
  props.item.background?.src.replace(
    ".png",
    (width.value < 500 ? "48" : "256") + ".png",
  ),
);

const hasDetails = computed(
  () => props.root && (props.item.description || props.item.exp),
);

const windowRatio = computed(() => Math.min(width.value, height.value));
const elementX = computed(
  () =>
    -width.value / 2 -
    (props.position !== -1 && !props.root
      ? translateX(props.position, windowRatio.value)
      : -20) +
    120 +
    "px",
);
const elementY = computed(
  () =>
    -height.value / 2 -
    (props.position !== -1 && !props.root
      ? translateY(props.position, windowRatio.value)
      : -20) +
    120 +
    "px",
);
const secondary = computed(() => props.item?.colors?.secondary || "#FFF");
</script>

<style scoped>
.wrapper {
  -webkit-clip-path: polygon(
    0% 25%,
    0% 75%,
    50% 100%,
    100% 75%,
    100% 25%,
    50% 0%
  );
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
  background: radial-gradient(
    at left v-bind(x) top v-bind(y),
    v-bind(secondary) 0%,
    v-bind(backgroundBorder) 20%
  );
  padding: 12px;
  background-position-x: v-bind(elementX);
  background-position-y: v-bind(elementY);
  background-size: 100vw 100vh;
  background-repeat: contain;
}

.hex {
  height: 96%;
  width: 96%;
  top: 2%;
  left: 2%;
  -webkit-clip-path: polygon(
    0% 25%,
    0% 75%,
    50% 100%,
    100% 75%,
    100% 25%,
    50% 0%
  );
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
}
</style>
