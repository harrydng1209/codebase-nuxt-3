<script setup lang="ts">
interface IProps {
  round?: boolean;
  type?: 'danger' | 'info' | 'primary' | 'success' | 'warning';
}

const props = withDefaults(defineProps<IProps>(), {
  round: true,
  type: 'primary'
});
</script>

<template>
  <ElButton :type="props.type" :round="props.round" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
  </ElButton>
</template>
