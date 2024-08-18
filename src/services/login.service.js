import { BASE_URL } from '../App';

export const fetchLogin = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jwtToken = await response.text(); 

        if (jwtToken) {
            return jwtToken;
        }

    } catch (error) {
        console.error('Login failed:', error); 
    }
    return null;
};