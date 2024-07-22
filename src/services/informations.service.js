import { BASE_URL } from "../App";
import { InformationsDto } from "../dto/informations.dto";

export const InformationssService = {

    async fetchAllInformations (authHeader) {
        const response = await fetch (`${BASE_URL}informations`, {
            headers: {'Authorization': authHeader}});
            const data = await response.json();
        if (response.status === 200) {
            return data.map(information => new InformationsDto (
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