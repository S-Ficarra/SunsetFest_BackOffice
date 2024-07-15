import axios from 'axios';
import { BASE_URL } from '../App';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}login`, { email, password });
        const authHeader = response.data;
        return authHeader
    } catch (error) {
        throw error;
    }
};