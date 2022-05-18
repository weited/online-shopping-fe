import api from './api';

export const getAllItems = (name) => api.get(`/items?name=${name}`);

export const updateBalance = (data) => api.put('/items', data);
