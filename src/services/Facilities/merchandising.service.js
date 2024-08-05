import { BASE_URL } from "../../App";
import { MerchandisingDto } from "../../dto/Facilities/merchandising.dto";


export const MerchandisingService = {

    async fetchAllMerchandising (authHeader) {
        const response = await fetch (`${BASE_URL}merchandisings`, {
            headers: {'Authorization': authHeader}});
        const data = await response.json();
        if (response.status === 200) {
            return data.map(merchandising => new MerchandisingDto (
                merchandising._id,
                merchandising._name,
                merchandising._longitude,
                merchandising._latitude,
                merchandising._type,
                merchandising._merchType,
                merchandising._openingTimes,
            ))
        } else {
            return {response, data};
        };
    },

    async fetchMerchandising (merchId) {
        const response = await fetch (`${BASE_URL}merchandisings/${merchId}`);
        const data = await response.json();
        if (response.status === 200) {
            return new MerchandisingDto (
                data._id,
                data._name,
                data._longitude,
                data._latitude,
                data._type,
                data._merchType,
                data._openingTimes,
            );
        } else {
            return {response, data}; 
        };
    },

    async createMerchandising (authHeader, newMerch) {
        
        const response = await fetch (`${BASE_URL}merchandisings/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMerch)
        });
        
        const data = await response.json();
        return {response, data};
    },

    async editMerchandising (authHeader, merchId, merchEdited) {
        const response = await fetch (`${BASE_URL}merchandisings/${merchId}/edit`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(merchEdited)
        });

        const data = await response.json();
        return {response, data};
    },

    async deleteMerchandising (authHeader, merchandisingId) {
        const response = await fetch(`${BASE_URL}merchandisings/${merchandisingId}/delete`, {
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