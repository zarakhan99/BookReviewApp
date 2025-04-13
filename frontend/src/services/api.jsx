import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // from .env
    headers: {
        'Content-Type': 'application/json',
    },
})

export default api;