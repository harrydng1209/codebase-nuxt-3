<script setup lang="ts">
interface IProps {
  path: string;
}

type TIcons = Record<string, () => Promise<{ default: Component }>>;

const props = defineProps<IProps>();

const icons = import.meta.glob('../../assets/icons/**/*.vue') as TIcons;
const iconComponent = shallowRef<Component | null>(null);

watch(
  () => props.path,
  async (newPath) => {
    const importPath = `../../assets/icons/${newPath}.vue`;

    if (!icons[importPath]) {
      iconComponent.value = null;
      return;
    }

    const component = await icons[importPath]();
    iconComponent.value = component.default as Component;
  },
  { immediate: true }
);
</script>

<template>
  <component :is="iconComponent" class="tw-cursor-pointer tw-outline-none" v-bind="$attrs" />
</template>
