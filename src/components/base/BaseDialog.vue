<template>
  <ElDialog :showClose="false" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
  </ElDialog>
</template>
