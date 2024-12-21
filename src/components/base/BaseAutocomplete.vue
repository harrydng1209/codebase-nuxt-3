<script setup lang="ts">
import type { AutocompleteFetchSuggestionsCallback, ElAutocomplete } from 'element-plus';

interface IProps {
  fetchSuggestions: (queryString: string, callback: AutocompleteFetchSuggestionsCallback) => void;
}

const props = withDefaults(defineProps<IProps>(), {
  fetchSuggestions: () => {}
});

const innerRef = ref<InstanceType<typeof ElAutocomplete> | null>(null);

defineExpose({ innerRef });
</script>

<template>
  <ElAutocomplete ref="innerRef" :fetchSuggestions="props.fetchSuggestions" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
  </ElAutocomplete>
</template>
