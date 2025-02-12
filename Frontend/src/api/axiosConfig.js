import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', 
    headers: {
        'Content-Type': 'application/json',
    },
});

const request = async (method, endpoint, data = null, config = {}) => {
    try {
        const requestConfig = {
            method,
            url: endpoint,
            ...config,
        };

        // Only attach data if it's not null
        if (data !== null) {
            requestConfig.data = data;
        }

        const response = await api(requestConfig);
        return response.data;
    } catch (error) {
        console.error(`API ${method.toUpperCase()} Error at ${endpoint}:`, error);
        throw error.response?.data || error.message;
    }
};

export default request;