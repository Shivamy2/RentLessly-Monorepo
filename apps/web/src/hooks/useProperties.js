/**
 * useProperties Hook
 * Fetch properties with filters using TanStack Query
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { propertyAPI } from '@/services/api/client';
import { useFilterStore } from '@/stores/filterStore';

export function useProperties() {
  const { filters, page, limit } = useFilterStore();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['properties', filters, page, limit],
    queryFn: () =>
      propertyAPI.getProperties({
        ...filters,
        page,
        limit,
      }),
    select: (response) => response.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    properties: data?.data || [],
    pagination: data?.pagination || {},
    isLoading,
    isError,
    error,
    isFetching,
  };
}

/**
 * useProperty Hook
 * Fetch single property by ID or slug
 */
export function useProperty(slug) {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['property', slug],
    queryFn: () => propertyAPI.getPropertyBySlug(slug),
    select: (response) => response.data.data,
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });

  return {
    property: data,
    isLoading,
    isError,
  };
}

/**
 * useSavedProperties Hook
 */
export function useSavedProperties() {
  const {
    data,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['saved-properties'],
    queryFn: () => savedAPI.getSavedProperties({ limit: 50 }),
    select: (response) => response.data.data,
  });

  return {
    savedProperties: data || [],
    isLoading,
    isRefetching,
    refetch,
  };
}
