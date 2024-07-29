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
                countdown._startingDateAndTime,
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
                data._startingDateAndTime,
                data._endingDateAndTime
            );
        } else {
            return {response, data}; 
        };    
    },



}