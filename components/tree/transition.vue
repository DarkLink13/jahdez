<template>
  <Transition>
    <slot />
  </Transition>
</template>
<script setup>
const props = defineProps({
  index: { type: Number, default: 0 },
  enter: { type: Boolean, default: true },
});
const enterX = computed(
  () => translateX(props.index, 100 * -(-props.enter * 2 + 1)) + "%",
);
const enterY = computed(
  () => translateY(props.index, 100 * -(-props.enter * 2 + 1)) + "%",
);
const leaveX = computed(
  () => translateX((props.index + 3) % 6, 100 * -(-props.enter * 2 + 1)) + "%",
);
const leaveY = computed(
  () => translateY((props.index + 3) % 6, 100 * -(-props.enter * 2 + 1)) + "%",
);
const scaleLeaveIdx = computed(() => 1 - (-0.19 + 0.38 * +props.enter));
const scaleEnterIdx = computed(() => 1 + (-0.19 + 0.38 * +props.enter));
</script>
<style>
@keyframes move {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(v-bind(leaveX), v-bind(leaveY))
      scale(v-bind(scaleLeaveIdx));
  }
}
@keyframes move-reverse {
  0% {
    opacity: 0;
    transform: translate(v-bind(enterX), v-bind(enterY))
      scale(v-bind(scaleEnterIdx));
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}

.translate-enter-active {
  animation: move-reverse 0.2s linear;
}

.translate-leave-active {
  animation: move 0.2s linear;
}
</style>
