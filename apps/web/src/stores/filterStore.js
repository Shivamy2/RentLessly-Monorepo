/**
 * Search & Filter Store using Zustand
 * Manages property search filters and pagination
 */

import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  filters: {
    location: '',
    bhk: null,
    priceMin: null,
    priceMax: null,
    furnished: false,
  },

  page: 1,
  limit: 20,

  /**
   * Update filters
   */
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      page: 1, // Reset to first page on filter change
    })),

  /**
   * Update single filter
   */
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      page: 1,
    })),

  /**
   * Clear all filters
   */
  clearFilters: () =>
    set({
      filters: {
        location: '',
        bhk: null,
        priceMin: null,
        priceMax: null,
        furnished: false,
      },
      page: 1,
    }),

  /**
   * Set page
   */
  setPage: (page) => set({ page }),

  /**
   * Set limit
   */
  setLimit: (limit) => set({ limit }),
}));
