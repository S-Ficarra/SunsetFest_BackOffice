import { BASE_URL } from "../../App";
import { CampingDto } from "../../dto/Facilities/camping.dto";

export const CampingService = {


    async fetchAllCampings (authHeader) {
        const response = await fetch (`${BASE_URL}campings`, {
            headers: {'Authorization': authHeader}});
        const data = await response.json();
        if (response.status === 200) {
            return data.map(camping => new CampingDto (
                camping._id,
                camping._name,
                camping._longitude,
                camping._latitude,
                camping._type,
                camping._capacity,
            ))
        } else {
            return {response, data};
        };
    },

    async createCamping (authHeader, newCamping) {
        
        const response = await fetch (`${BASE_URL}campings/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCamping)
        });
        
        const data = await response.json();
        return {response, data};
    },

    async deleteCamping (authHeader, campingId) {
        const response = await fetch(`${BASE_URL}campings/${campingId}/delete`, {
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