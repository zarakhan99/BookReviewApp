import api from './api';

export const loginUser = async (email, password) => {
    const response = await api.post('/login', { email, password })
    return response.data;
}

export const registerUser = async (formData) => {
   const response = await api.post('/register', formData)
    return response.data;
}
