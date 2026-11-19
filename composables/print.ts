// Pages opened with ?print=1 (from the node menu) open the print dialog once
// images, icons and fonts are in, then drop the flag so a reload won't reprint.
export const usePrintOnLoad = () => {
  const route = useRoute();
  const router = useRouter();

  onMounted(async () => {
    if (!route.query.print) return;
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((img) =>
        img.complete
          ? undefined
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
      ),
    );
    // Icons are fetched after mount; give them a moment to render.
    await new Promise((resolve) => setTimeout(resolve, 500));
    await router.replace({ query: {} });
    window.print();
  });
};
