import { BASE_URL } from "../App";

export const PerformanceServices = {

    async createPerformance (authHeader, performance) {
        const response = await fetch(`${BASE_URL}performances/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(performance)
        });

        const data = await response.json();
        return {response, data}; 
    },

    async deletePerformance (authHeader, performanceId) {
        const response = await fetch(`${BASE_URL}performances/${performanceId}/delete`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return {response, data}; 
    }
}