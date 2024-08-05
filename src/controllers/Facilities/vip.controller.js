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

export const GetVip = async (vipId) => {

    const vipDto = await VipService.fetchVip(vipId);
    const vipModel = VipMapper.transformVipDtoToModel(vipDto);

    return vipModel;
};

export const CreateVip = async (authHeader, newVip) => {

    let { response, data } = await VipService.createVip(authHeader, newVip);

    if (response.status === 200) {
        return VipMapper.transformVipDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const EditVip = async (authHeader, id, vipEdited) => {

    let { response, data } = await VipService.editVip(authHeader, id, vipEdited);

    if (response.status === 200) {
        return VipMapper.transformVipDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const DeleteVip = async (authHeader, vipId) => {

    let { response, data } = await VipService.deleteVip(authHeader, vipId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
}