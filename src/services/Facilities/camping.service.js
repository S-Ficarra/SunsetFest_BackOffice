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

    async fetchCamping (campingId) {
        const response = await fetch (`${BASE_URL}campings/${campingId}`);
        const data = await response.json();
        if (response.status === 200) {
            return new CampingDto (
                data._id,
                data._name,
                data._longitude,
                data._latitude,
                data._type,
                data._capacity,
            );
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


    async editCamping (authHeader, campingId, campingEdited) {
        const response = await fetch (`${BASE_URL}campings/${campingId}/edit`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campingEdited)
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