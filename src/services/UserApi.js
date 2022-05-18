import api from './api';

export const getUserById = () => api.get(`/users/${1}`);

export const update = (data) => api.put('/users', data);

export const addBalance = (id, data) => api.patch(`/users/${id}`, data);
