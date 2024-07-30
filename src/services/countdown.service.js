import { BASE_URL } from "../App";
import { CountdownDto } from "../dto/countdown.dto";

export const CountdownService = {

    async fetchAllCountdowns (authHeader) {
        const response = await fetch (`${BASE_URL}countdowns`, {
            headers: {'Authorization': authHeader}});
        const data = await response.json();
        if (response.status === 200) {
            return data.map(countdown => new CountdownDto(
                countdown._id,
                countdown._name,
                countdown._endingDateAndTime
            ));
        } else {
            return {response, data}; 
        };
    },

    async fetchCountdown (authHeader, countdownId) {
        const response = await fetch (`${BASE_URL}countdowns/${countdownId}`, {
            headers: {'Authorization': authHeader}});
        const data = await response.json();
        if (response.status === 200) {
            return new CountdownDto (
                data._id,
                data._name,
                data._endingDateAndTime
            );
        } else {
            return {response, data}; 
        };    
    },

    async createCountdown (authHeader, newCountdown) {
        
        const response = await fetch (`${BASE_URL}countdowns/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCountdown)
        });
        
        const data = await response.json();
        return {response, data};
    },

    async editCountdown (authHeader, countdownId, countdownEdited) {
        const response = await fetch (`${BASE_URL}countdowns/${countdownId}/edit`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(countdownEdited)
        });

        const data = await response.json();
        return {response, data};
    },

    async deleteCountdown (authHeader, countdownId) {
        const response = await fetch(`${BASE_URL}countdowns/${countdownId}/delete`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return {response, data}; 
    },

}