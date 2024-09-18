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
                band._thumbnailImageUrl,
                band._bannerImageUrl,
                band._user,
                band._createdAt,
                band._modifiedAt
            ));
        } else {
            return {response, data}; 
        };
    },

    async fetchBand (authHeader, bandId) {
        const response = await fetch (`${BASE_URL}bands/${bandId}`, {
            headers: {'Authorization': authHeader}});
        const data = await response.json();
        if (response.status === 200) {
            return new BandDto (
                data._id,
                data._name,
                data._country,
                data._text,
                data._socials,
                data._thumbnailImageUrl,
                data._bannerImageUrl,
                data._user,
                data._createdAt,
                data._modifiedAt
            );
        } else {
            return {response, data}; 
        };
    },

    async createBand (authHeader, newBand) {
        const response = await fetch (`${BASE_URL}bands/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
            },
            body: newBand
        });
        
        const data = await response.json();
        return {response, data};

    },

    async editBand (authHeader, bandId, bandEdited) {
        const response = await fetch (`${BASE_URL}bands/${bandId}/edit`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
            },
            body: bandEdited
        });

        const data = await response.json();
        return {response, data};
    },


    async deleteBand (authHeader, bandId) {
        const response = await fetch(`${BASE_URL}bands/${bandId}/delete`, {
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