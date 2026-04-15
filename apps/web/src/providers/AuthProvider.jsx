/**
 * Auth Provider
 * Initializes auth state on app load
 */

'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function AuthProvider({ children }) {
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  return children;
}
