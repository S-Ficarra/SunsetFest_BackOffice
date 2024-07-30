import { VipMapper } from "../../mappers/Facilities/vip.mapper";
import { VipService } from "../../services/Facilities/vip.service";

export const GetAllVips = async (authHeader) => {

    let response = await VipService.fetchAllVips(authHeader);

    if (Array.isArray(response)) {
        let vipsModelArray = response.map(dto => VipMapper.transformVipDtoToModel(dto));
        return vipsModelArray;
    }

    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

};


export const DeleteVip = async (authHeader, vipId) => {

    let { response, data } = await VipService.deleteVip(authHeader, vipId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
}