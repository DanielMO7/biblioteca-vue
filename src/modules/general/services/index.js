import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
});

export default apiClient;