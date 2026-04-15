/**
 * Auth Store using Zustand
 * Manages user authentication state
 */

import { create } from 'zustand';
import { authAPI } from '@/services/api/client';

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  /**
   * Initialize from localStorage/cookies
   */
  hydrateAuth: () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Verify token is valid
      authAPI
        .getCurrentUser()
        .then((res) => {
          set({
            user: res.data.data,
            isAuthenticated: true,
          });
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        });
    }
  },

  /**
   * Send OTP to phone number
   */
  sendOTP: async (phoneNumber) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.sendOTP(phoneNumber);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Failed to send OTP',
      });
      throw error;
    }
  },

  /**
   * Verify OTP and login
   */
  verifyOTP: async (phoneNumber, otp) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.verifyOTP(phoneNumber, otp);
      const { accessToken, refreshToken, user } = response.data.data;

      // Store tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Failed to verify OTP',
      });
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },

  /**
   * Clear error
   */
  clearError: () => set({ error: null }),
}));
