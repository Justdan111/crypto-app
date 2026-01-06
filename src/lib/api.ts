import api from './axios';

export const fetchCryto = async () => {
    const response = await api.get("/crypto");
    return response.data;
};