import { BASE_URL } from "../../App";
import { BarDto } from "../../dto/Facilities/bar.dto";


export const BarService = {

    async fetchAllBar (authHeader) {
        const response = await fetch (`${BASE_URL}bars`, {
            headers: {'Authorization': authHeader}});
        const data = await response.json();
        if (response.status === 200) {
            return data.map(bar => new BarDto (
                bar._id,
                bar._name,
                bar._longitude,
                bar._latitude,
                bar._type,
                bar._openingTimes,
            ))
        } else {
            return {response, data};
        };
    },

    async deleteBar (authHeader, barId) {
        const response = await fetch(`${BASE_URL}bars/${barId}/delete`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return {response, data}; 
    },



};