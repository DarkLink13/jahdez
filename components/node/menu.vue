<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="scale-95 opacity-0"
      leave-active-class="transition duration-75 ease-in"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="open && node"
        ref="menu"
        role="menu"
        :aria-label="label"
        class="fixed z-[100] w-72 overflow-hidden rounded-xl border border-stone-200 bg-white/95 text-stone-800 shadow-2xl backdrop-blur dark:border-stone-700 dark:bg-stone-900/95 dark:text-stone-100"
        :style="{ left: `${position.x}px`, top: `${position.y}px`, transformOrigin: position.origin }"
        @keydown="onKeydown"
        @contextmenu.prevent
      >
        <div class="flex items-center gap-3 border-b border-stone-200 px-3 py-2.5 dark:border-stone-700">
          <span
            class="hex h-7 w-6 shrink-0"
            :style="{ background: node.item.colors?.secondary ?? '#a8a29e' }"
          />
          <div class="min-w-0">
            <p class="truncate text-sm font-semibold">{{ label }}</p>
            <p class="text-xs text-stone-500 dark:text-stone-400">
              {{ $t(`pdf.types.${node.item.type}`) }}
            </p>
          </div>
        </div>

        <ul class="p-1">
          <li v-for="(action, i) in actions" :key="action.to" role="none">
            <div
              v-if="action.divider"
              role="separator"
              class="mx-2 my-1 border-t border-stone-200 dark:border-stone-700"
            />
            <button
              :ref="(el) => (buttons[i] = el as HTMLButtonElement)"
              role="menuitem"
              type="button"
              class="flex w-full items-start gap-3 rounded-lg px-2.5 py-2 text-left outline-none transition-colors hover:bg-stone-100 focus-visible:bg-stone-100 dark:hover:bg-stone-800 dark:focus-visible:bg-stone-800"
              @click="go(action.to)"
            >
              <UIcon :name="action.icon" class="mt-0.5 h-5 w-5 shrink-0 text-stone-500 dark:text-stone-400" />
              <span class="min-w-0">
                <span class="block text-sm font-medium">{{ action.title }}</span>
                <span class="block text-xs text-stone-500 dark:text-stone-400">
                  {{ action.hint }}
                </span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
const props = defineProps<{ node?: INode; x: number; y: number }>();
const open = defineModel<boolean>({ default: false });

const { t, locale } = useI18n();
const route = useRoute();

const menu = ref<HTMLElement | null>(null);
const buttons = ref<HTMLButtonElement[]>([]);
const position = reactive({ x: 0, y: 0, origin: "top left" });

const label = computed(
  () => props.node?.item.label?.[locale.value as "es" | "en"] ?? props.node?.item.label?.en ?? "",
);

const actions = computed(() =>
  props.node
    ? [
        {
          to: `/pdf/graph/${props.node.id}?print=1`,
          icon: "i-fluent-document-arrow-down-24-regular",
          title: t("pdf.menu.exportNode", { name: label.value }),
          hint: t("pdf.menu.exportNodeHint"),
        },
        {
          to: "/pdf/graph?print=1",
          icon: "i-fluent-organization-24-regular",
          title: t("pdf.menu.exportGraph"),
          hint: t("pdf.menu.exportGraphHint"),
        },
        {
          to: "/pdf?print=1",
          icon: "i-fluent-document-person-20-regular",
          title: t("pdf.menu.cv"),
          hint: t("pdf.menu.cvHint"),
          divider: true,
        },
      ]
    : [],
);

const close = () => (open.value = false);
const go = (to: string) => {
  close();
  navigateTo(to);
};

// Opens at the pointer, flipped to the other side when it would overflow.
watch(open, async (isOpen) => {
  if (!isOpen) return;
  position.x = props.x;
  position.y = props.y;
  await nextTick();
  const rect = menu.value?.getBoundingClientRect();
  if (!rect) return;
  const margin = 8;
  const flipX = props.x + rect.width + margin > window.innerWidth;
  const flipY = props.y + rect.height + margin > window.innerHeight;
  position.x = Math.max(margin, flipX ? props.x - rect.width : props.x);
  position.y = Math.max(margin, flipY ? props.y - rect.height : props.y);
  position.origin = `${flipY ? "bottom" : "top"} ${flipX ? "right" : "left"}`;
  buttons.value[0]?.focus();
});

const onKeydown = (event: KeyboardEvent) => {
  const items = buttons.value.filter(Boolean);
  const index = items.indexOf(document.activeElement as HTMLButtonElement);
  const move = (to: number) => {
    event.preventDefault();
    items[(to + items.length) % items.length]?.focus();
  };
  if (event.key === "ArrowDown") move(index + 1);
  else if (event.key === "ArrowUp") move(index - 1);
  else if (event.key === "Home") move(0);
  else if (event.key === "End") move(items.length - 1);
  else if (event.key === "Escape" || event.key === "Tab") {
    event.preventDefault();
    close();
  }
};

onClickOutside(menu, close);
useEventListener(window, "scroll", close, { capture: true, passive: true });
useEventListener(window, "resize", close);
useEventListener(window, "blur", close);
watch(() => route.fullPath, close);
</script>

<style scoped>
.hex {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
</style>
