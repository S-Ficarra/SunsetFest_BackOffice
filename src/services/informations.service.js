import { BASE_URL } from "../App";
import { InformationsDto } from "../dto/informations.dto";

export const InformationssService = {

    async fetchAllInformations (authHeader) {
        const response = await fetch (`${BASE_URL}informations`, {
            headers: {'Authorization': authHeader}});
        if (response.status === 200) {
            const data = await response.json();
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
            return response.statusText
        };
    },

}