<template>
  <svg
    id="circuit"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 132.29166 132.29167"
  >
    <defs>
      <filter id="glowNodes">
        <feGaussianBlur
          id="glowNodesBlur"
          stdDeviation=".3"
          result="result"
          color-interpolation-filters="sRGB"
        />
      </filter>
      <radialGradient
        id="gradientLines"
        cx="0"
        cy="0"
        r=".8"
        spreadMethod="pad"
        gradientUnits="objectBoundingBox"
        gradientTransform="matrix(1 0 0 1.107768 0.5 0.5)"
      >
        <stop id="gradientLines0" offset="0%" :stop-color="primary" />
        <stop id="gradientLines1" offset="50%" :stop-color="secondary" />
      </radialGradient>
      <filter id="glowLines" x="-10%" width="120%" y="-10%" height="120%">
        <feGaussianBlur
          id="glowLines-drop-shadow-0-blur"
          in="SourceAlpha"
          stdDeviation="2"
          result="blur"
        />
        <feFlood
          id="glowLines-drop-shadow-0-flood"
          flood-color="#0c0c0d"
          result="color"
        />
        <feComposite
          id="glowLines-drop-shadow-0-composite"
          operator="in"
          in="color"
          in2="blur"
        />
        <feMerge id="glowLines-drop-shadow-0-merge">
          <feMergeNode id="glowLines-drop-shadow-0-merge-node-1" in="blur" />
          <feMergeNode
            id="glowLines-drop-shadow-0-merge-node-2"
            in="SourceGraphic"
          />
        </feMerge>
      </filter>
      <filter id="glowExp" x="-100%" width="300%" y="-100%" height="400%">
        <feComposite in2="SourceGraphic" operator="in" />
        <feGaussianBlur stdDeviation="3" />
        <feComponentTransfer>
          <feFuncA type="gamma" exponent=".9" amplitude="3" />
        </feComponentTransfer>
        <feComposite in="SourceGraphic" />
      </filter>
      <filter id="glowDot" x="-150%" width="400%" y="-150%" height="400%">
        <feComposite in2="SourceGraphic" operator="in" />
        <feGaussianBlur stdDeviation=".6" />
        <feComponentTransfer>
          <feFuncA type="gamma" exponent=".9" amplitude="2" />
        </feComponentTransfer>
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <!-- <g filter="url(#glowNodes)">
      <path
        :d="BackgroundCircuit"
        fill="none"
        :stroke="primary"
        stroke-width="1.5"
      />
    </g> -->
    <g filter="url(#glowNodes)">
      <path
        :d="BackgroundCircuit"
        fill="none"
        stroke="url(#gradientLines)"
        stroke-width="1.5"
      />
    </g>
    <g filter="url(#glowDot)">
      <background-circle
        v-for="(animation, index) of animations"
        :id="'circle' + index"
        :key="index"
        :keyframes="animation"
        :colors="colors"
      />
    </g>
  </svg>
</template>
<script lang="ts" setup>
const props = defineProps({
  colors: {
    type: Object as PropType<IColorConfig>,
    default: () => ({
      0: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      1: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      2: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      3: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      4: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      5: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      6: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      7: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      8: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      9: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      10: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      11: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      12: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      13: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      14: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      15: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      16: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      17: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
      parent: {
        primary: "#2ac7ec",
        secondary: "#f0e5b1",
        hover: "white",
      },
    }),
  },
  primary: { type: String, default: "#202020" },
  secondary: { type: String, default: "#20202017" },
});
const animations = computed(() =>
  BackgroundAnimationCircuit.filter(
    (animation) =>
      props.colors[animation[0].fill] !== undefined &&
      props.colors[animation[100].fill] !== undefined
  )
);
</script>
<style>
#circuit {
  position: absolute;
}
</style>
