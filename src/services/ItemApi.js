import api from './api';

export const getAllItems = () => api.get('/items');

export const updateBalance = (data) => api.put('/items', data);
