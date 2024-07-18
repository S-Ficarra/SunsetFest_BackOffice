import axios from 'axios';
import { BASE_URL } from '../App';

export const fetchLogin = async (email, password) => {

    try {

        const response = await axios.post(`${BASE_URL}login`, { email, password });
        const jwtToken = response.data;

        if (jwtToken) {
            return jwtToken;
        };

    } catch (error) {
        console.error('Login failed:', error);
    };
    return null;

};
