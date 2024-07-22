import { BASE_URL } from "../App";
import { IllustratedDto } from "../dto/illustrated.dto";

export const InformationssService = {

    async fetchAllInformations (authHeader) {
        const response = await fetch (`${BASE_URL}informations`, {
            headers: {'Authorization': authHeader}});
            const data = await response.json();
        if (response.status === 200) {
            return data.map(information => new IllustratedDto (
                information._id,
                information._user,
                information._createdAt,
                information._modifiedAt,
                information._status,
                information._type,
                information._content,
            ));
        } else {
            return {response, data}; 
        };
    },

    async fetchInformation (authHeader, informationId) {
        const response = await fetch (`${BASE_URL}informations/${informationId}`, {
            headers: {'Authorization': authHeader}});
            const data = await response.json();
        if (response.status === 200) {
            return new IllustratedDto (
                data._id,
                data._user,
                data._createdAt,
                data._modifiedAt,
                data._status,
                data._type,
                data._content,
            );
        } else {
            return response.statusText
        };
    },

    async createInformation (authHeader, newInformation) {
       
        const response = await fetch (`${BASE_URL}informations/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
            },
            body: newInformation
        });
        
        const data = await response.json();
        console.log(data);
        return {response, data};
    },

    async editInformation (authHeader, informationId, informationEdited) {
        const response = await fetch (`${BASE_URL}informations/${informationId}/edit`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
            },
            body: informationEdited
        });

        const data = await response.json();
        return {response, data};
    },

    async deleteInformation (authHeader, informationId) {
        const response = await fetch(`${BASE_URL}informations/${informationId}/delete`, {
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