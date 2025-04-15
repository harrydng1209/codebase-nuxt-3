interface IPagination {
  currentPage: number;
  pageSize: number;
  total: number;
}

export const usePagination = () => {
  const pagination = ref<IPagination>({
    currentPage: 1,
    pageSize: 100,
    total: 0,
  });

  const totalPages = computed(() => {
    if (pagination.value.pageSize <= 0) return 0;
    return Math.ceil(pagination.value.total / pagination.value.pageSize);
  });

  return {
    pagination,
    totalPages,
  };
};
