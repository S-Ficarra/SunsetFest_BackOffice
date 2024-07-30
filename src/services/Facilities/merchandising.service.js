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



};