/**
 * Frontend API Service
 * All API endpoints and HTTP calls
 */

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          { refreshToken },
        );

        const { accessToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

// =====================
// Auth Endpoints
// =====================

export const authAPI = {
  sendOTP: (phoneNumber) =>
    apiClient.post('/auth/send-otp', { phoneNumber }),

  verifyOTP: (phoneNumber, otp) =>
    apiClient.post('/auth/verify-otp', { phoneNumber, otp }),

  refreshToken: (refreshToken) =>
    apiClient.post('/auth/refresh-token', { refreshToken }),

  getCurrentUser: () => apiClient.get('/auth/me'),

  logout: () => apiClient.post('/auth/logout'),
};

// =====================
// Property Endpoints
// =====================

export const propertyAPI = {
  getProperties: (filters) =>
    apiClient.get('/properties', { params: filters }),

  getPropertyById: (id) => apiClient.get(`/properties/${id}`),

  getPropertyBySlug: (slug) => apiClient.get(`/properties/slug/${slug}`),

  createProperty: (data) => apiClient.post('/properties', data),
};

// =====================
// Saved Properties Endpoints
// =====================

export const savedAPI = {
  getSavedProperties: (params) =>
    apiClient.get('/saved', { params }),

  saveProperty: (propertyId) => apiClient.post(`/saved/${propertyId}`),

  removeSavedProperty: (propertyId) =>
    apiClient.delete(`/saved/${propertyId}`),
};

// =====================
// Visit Endpoints
// =====================

export const visitAPI = {
  scheduleVisit: (data) => apiClient.post('/visits', data),

  getUserVisits: (params) => apiClient.get('/visits', { params }),

  updateVisitStatus: (visitId, status) =>
    apiClient.put(`/visits/${visitId}`, { status }),
};

export default apiClient;
