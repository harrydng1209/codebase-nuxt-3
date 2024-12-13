<script setup lang="ts">
interface IProps {
  type?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  round?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'primary',
  round: true
});
</script>

<template>
  <ElButton :type="props.type" :round="props.round" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
  </ElButton>
</template>
