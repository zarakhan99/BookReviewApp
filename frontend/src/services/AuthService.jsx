import api from './api';

export const loginUser = async (email, password) => {
    const response = await api.post('/account/login', { email, password })
    return response.data;
}

export const registerUser = async (email, password) => {
   const response = await api.post('/account/register', {email, password})
    return response.data;
}
