<template>
  <circle
    :id="id"
    class="circle"
    r="0.5"
    :transform="getTransform"
    opacity="0"
    fill="white"
    stroke-width="1.02658"
  >
    <component :is="'style'">
      {{
        `#${id} {
          animation: animate${id} ${duration.toFixed(2)}ms infinite linear
        }
        @keyframes animate${id} {
          ${Object.keys(keyframes)
            .map(
              (keyframe: any, index, array) => `${(
                delay +
                parseInt(keyframe) / 10
              ).toFixed(2)}%${
                array.length - 1 === index
                  ? ", 100%"
                  : index === 0
                    ? ", 0%"
                    : ""
              } {
            ${
              keyframes[keyframe].transform !== undefined
                ? `transform: translate(${keyframes[
                    keyframe
                  ].transform?.translate.join("px, ")}px);`
                : ""
            }
            ${
              keyframes[keyframe].fill !== undefined
                ? `fill: ${
                    (colors !== undefined &&
                      colors[keyframes[keyframe].fill]) ||
                    "white"
                  };`
                : ""
            }
            ${
              keyframes[keyframe].opacity !== undefined
                ? `opacity: ${keyframes[keyframe].opacity};`
                : ""
            }
          }`
            )
            .join(" ")}
        }`
      }}
    </component>
  </circle>
</template>
<script lang="ts" setup>
const props = defineProps({
  id: { type: String, default: "" },
  keyframes: { type: Object, default: () => {} },
  colors: { type: Object, default: () => {} },
});
const duration = ref(10000);
const delay = ref(90);
onMounted(() => {
  duration.value = Math.random() * 10000 + 10000;
  delay.value = Math.random() * 90;
});
const getTransform = computed(
  () => `translate(${props.keyframes[0].transform?.translate.join(" ")})`
);
</script>
