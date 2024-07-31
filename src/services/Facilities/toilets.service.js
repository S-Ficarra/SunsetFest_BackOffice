import { BASE_URL } from "../../App";
import { ToiletDto } from "../../dto/Facilities/toilet.dto";

export const ToiletService = {

    async fetchAllToilets (authHeader) {
        const response = await fetch (`${BASE_URL}toilets`, {
            headers: {'Authorization': authHeader}});
        const data = await response.json();
        if (response.status === 200) {
            return data.map(toilet => new ToiletDto (
                toilet._id,
                toilet._name,
                toilet._longitude,
                toilet._latitude,
                toilet._type,
            ))
        } else {
            return {response, data};
        };
    },

    async createToilet (authHeader, newToilet) {
        
        const response = await fetch (`${BASE_URL}toilets/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newToilet)
        });
        
        const data = await response.json();
        return {response, data};
    },

    async deleteToilet (authHeader, toiletId) {
        const response = await fetch(`${BASE_URL}toilets/${toiletId}/delete`, {
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
