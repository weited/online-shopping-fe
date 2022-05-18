import api from './api';

export const createPurchase = (data) => api.post(`/purchases`, data);

export const getAllPurchases = (query) => api.get(`/purchases/${query}`);

export const getPurchasesByUserId = (userId) =>
  api.get(`/purchases/user/${userId}`);

export const getPurchasesByPurId = (purId) => api.get(`/purchases/${purId}`);

export const deletePurchaseById = (id) => api.delete(`/purchases/${id}`);
