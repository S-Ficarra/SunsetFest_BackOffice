import { BASE_URL } from "../../App";
import { VipDto } from "../../dto/Facilities/vip.dto";


export const VipService = {

    async fetchAllVips (authHeader) {
        const response = await fetch (`${BASE_URL}vips`, {
            headers: {'Authorization': authHeader}});
        const data = await response.json();
        if (response.status === 200) {
            return data.map(vip => new VipDto (
                vip._id,
                vip._name,
                vip._longitude,
                vip._latitude,
                vip._type,
                vip._capacity,
            ))
        } else {
            return {response, data};
        };
    },

    async fetchVip (vipId) {
        const response = await fetch (`${BASE_URL}vips/${vipId}`);
        const data = await response.json();
        if (response.status === 200) {
            return new VipDto (
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

    async createVip (authHeader, newVip) {
        
        const response = await fetch (`${BASE_URL}vips/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newVip)
        });
        
        const data = await response.json();
        return {response, data};
    },

    async editVip (authHeader, vipId, vipEdited) {
        const response = await fetch (`${BASE_URL}vips/${vipId}/edit`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vipEdited)
        });

        const data = await response.json();
        return {response, data};
    },

    async deleteVip (authHeader, vipId) {
        const response = await fetch(`${BASE_URL}vips/${vipId}/delete`, {
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