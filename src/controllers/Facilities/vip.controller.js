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