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



};