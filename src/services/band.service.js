import { BASE_URL } from "../App";
import { BandDto } from "../dto/band.dto";

export const BandService = {

    async fetchAllBands (authHeader) {
        const response = await fetch (`${BASE_URL}bands`, {
            headers: {'Authorization': authHeader}});
            const data = await response.json();
        if (response.status === 200) {
            return data.map(band => new BandDto(
                band._id,
                band._name,
                band._country,
                band._text,
                band._socials,
                band._thumbnailImage,
                band._bannerImage,
                band._user,
                band._createdAt,
                band._modifiedAt
            ));
        } else {
            return {response, data}; 
        };
    },

}