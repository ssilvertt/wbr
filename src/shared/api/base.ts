import axios from 'axios';

export const baseAPI = axios.create({
    baseURL: "https://wbruletka.games/user_api/",
});

baseAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});