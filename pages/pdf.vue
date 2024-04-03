<template>
  <div
    v-if="data"
    class="w-[600px] h-[800px] flex flex-col items-start relative bg-white p-2 shadow-2xl"
    ref="pdfSection"
  >
    <div class="flex gap-2">
      <div class="hex" />
      <div class="flex flex-col">
        <p>Jorge Amado Hernandez Betancourt</p>
        <p class="text-sm text-gray-800">
          Full Stack Web Developer | {{ years }} years
        </p>
        <p class="text-gray-800 text-sm">
          Santiago de los Caballeros, Dominican Republic
        </p>
        <a href="tel:+18094936290" class="text-xs text-blue-700"
          >+1 (809)-493-6290</a
        >
        <a
          href="https://www.linkedin.com/in/jorgeamadohernandez/"
          class="text-xs text-blue-700"
          >LinkedIn Profile</a
        >
        <a href="mailto:jahdez1302@gmail.com" class="text-xs text-blue-700"
          >jahdez1302@gmail.com</a
        >
      </div>
    </div>
    <div class="flex gap-2">
      <div class="flex flex-col">
        <p class="font-semibold">Jobs</p>
        <ul class="text-sm">
          <li>Senior Web Developer</li>
          <li>Senior Web Developer</li>
        </ul>
      </div>
      <div class="flex flex-col"></div>
    </div>
    <u-button
      class="absolute right-2 bottom-2"
      @click="
        exportToPDF('my-pdf-file.pdf', pdfSection, {
          unit: 'px',
          format: [800, 600],
        })
      "
      >Export</u-button
    >
  </div>
</template>
<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
definePageMeta({
  layout: "circuit",
});
const pdfSection = ref<HTMLElement | null>(null);

const { data } = useFetch<INode>("/api/node/root", {
  onResponseError() {
    return router.push("/node/root");
  },
});
const years = computed(
  () =>
    `+${(
      (new Date() - new Date("10/01/2018")) /
      (1000 * 60 * 60 * 24 * 30 * 12)
    ).toFixed(0)}`,
);
</script>
<style>
.hex:before {
  content: " ";
  width: 0;
  height: 0;
  border-bottom: 30px solid #000;
  border-left: 52px solid transparent;
  border-right: 52px solid transparent;
  position: absolute;
  top: -30px;
}

.hex {
  position: relative;
  display: block;
  margin-top: 30px;
  width: 104px;
  height: 60px;
  background-color: #000;
}

.hex:after {
  content: "";
  width: 0;
  position: absolute;
  bottom: -30px;
  border-top: 30px solid #000;
  border-left: 52px solid transparent;
  border-right: 52px solid transparent;
}
</style>
