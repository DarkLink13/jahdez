<template>
  <div
    class="hex-border absolute flex items-center justify-center"
    :style="{
      width: `${size}px`,
      height: `${size * 1.15}px`,
      background: item.colors?.secondary ?? '#d6d3d1',
    }"
  >
    <div
      class="hex-inner flex flex-col items-center justify-center gap-1 bg-stone-50 px-3 text-center"
    >
      <img
        v-if="image"
        :src="image"
        alt=""
        class="max-w-[60%] object-contain"
        :style="{ maxHeight: `${size * 0.32}px` }"
      />
      <Icon
        v-else-if="item.icon"
        :name="item.icon.key"
        :size="`${size * 0.26}px`"
        :style="{ color: item.colors?.primary ?? '#44403c' }"
      />
      <p
        class="font-semibold uppercase leading-tight"
        :style="{
          color: item.colors?.primary ?? '#1c1917',
          fontSize: `${Math.max(9, size * 0.075)}px`,
        }"
      >
        {{ nodeText(item.label, locale) }}
      </p>
      <p
        v-if="details"
        class="leading-tight text-stone-500"
        :style="{ fontSize: `${Math.max(7, size * 0.055)}px` }"
      >
        {{ details }}
      </p>
      <p
        v-if="item.exp"
        class="font-bold"
        :style="{
          color: item.colors?.primary ?? '#44403c',
          fontSize: `${Math.max(8, size * 0.07)}px`,
        }"
      >
        {{ item.exp }}%
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{ item: INodeItem; size?: number; locale: GraphLocale }>(),
  { size: 150 },
);

const image = computed(() => props.item.background?.src.replace(".png", "256.png"));

// Short facts for the hexagon itself; the side panel has the full text.
const details = computed(() =>
  [
    nodePeriod(props.item, props.locale, "…")?.text,
    nodeSublabel(props.item, NodeItemLabelType.Years)?.[props.locale],
    nodeSublabel(props.item, NodeItemLabelType.Version)?.[props.locale],
  ]
    .filter(Boolean)
    .join(" · "),
);
</script>

<style scoped>
.hex-border,
.hex-inner {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.hex-inner {
  width: calc(100% - 6px);
  height: calc(100% - 7px);
}
</style>
