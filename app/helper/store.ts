export const store = {
  filters: [] as any,

  setSelectedFilters: async (selectedFilters: any) => {
    if (Object.keys(selectedFilters).length > 0) {
      store.filters.push(selectedFilters);
    }
  },

  getSelectedFilters: async () => {
    if (store.filters.length > 0) {
      return store.filters[store.filters.length - 1];
    }
  }
}