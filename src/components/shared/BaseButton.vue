<script setup lang="ts">
import type { ElButton } from 'element-plus';

interface IProps {
  round?: boolean;
  type?: 'danger' | 'default' | 'info' | 'primary' | 'success' | 'warning';
}

const props = withDefaults(defineProps<IProps>(), {
  round: true,
  type: 'primary',
});

const slots: ReturnType<typeof useSlots> = useSlots();

const innerRef = ref<InstanceType<typeof ElButton> | null>(null);

defineExpose({ innerRef });
</script>

<template>
  <ElButton
    ref="innerRef"
    :type="props.type"
    :round="props.round"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
  </ElButton>
</template>
