import api from './axios';

export const fetchCrypto = async () => {
    const response = await api.get("/crypto");
    return response.data;
};