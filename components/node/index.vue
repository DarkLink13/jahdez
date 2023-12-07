<template>
  <div
    :style="{
      backgroundImage: `linear-gradient(to bottom, ${item.colors?.secondary}, ${item.colors?.primary})`,
    }"
    :class="` z-50 absolute h-0 hex
    ${
      root
        ? 'w-[25%] pb-[25%] hover:w-[27%] hover:pb-[27%]'
        : 'w-[20%] pb-[20%] hex hover:w-[22%] hover:pb-[22%]'
    }
    transition-[width,padding] ease-in-out duration-75 shadow-2xl`"
  >
    <div
      class="flex items-center justify-center w-full h-full absolute flex-col opacity-20"
    >
      {{ position }}
      <icon :name="item.icon?.key" size="50" />
      <div class="uppercase">
        {{ item?.label?.[$i18n.locale as "es" | "en"] }}
      </div>
      <div v-if="item?.description" class="hexagon-content">
        {{ item?.description?.[$i18n.locale as "es" | "en"] }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  position: { type: Number, required: true },
  root: { type: Boolean, default: false },
  item: { type: Object as PropType<INodeItem>, required: true },
});
</script>

<style>
.hex {
  -webkit-clip-path: polygon(
    25% 5%,
    75% 5%,
    100% 50%,
    75% 95%,
    25% 95%,
    0% 50%
  );
  clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
}
</style>
