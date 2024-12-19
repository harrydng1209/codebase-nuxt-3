interface IPagination {
  currentPage: number;
  pageSize: number;
  total: number;
}

const usePagination = () => {
  const pagination = ref<IPagination>({
    currentPage: 1,
    pageSize: 100,
    total: 0
  });

  const totalPages = computed(() => {
    return Math.ceil(pagination.value.total / pagination.value.pageSize);
  });

  return {
    pagination,
    totalPages
  };
};

export default usePagination;
