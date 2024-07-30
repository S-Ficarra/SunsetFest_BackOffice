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



};