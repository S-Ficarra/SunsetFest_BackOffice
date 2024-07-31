import { MerchandisingService } from "../../services/Facilities/merchandising.service";
import { MerchandisingMapper } from "../../mappers/Facilities/merchandising.mapper";


export const GetAllMerchandisings = async (authHeader) => {

    let response = await MerchandisingService.fetchAllMerchandising(authHeader);

    if (Array.isArray(response)) {
        let merchandisingModelArray = response.map(dto => MerchandisingMapper.transformDtoMerchToModel(dto));
        return merchandisingModelArray;
    }

    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

};

export const CreateMerchandising = async (authHeader, newMerch) => {

    let { response, data } = await MerchandisingService.createMerchandising(authHeader, newMerch);

    if (response.status === 200) {
        return MerchandisingMapper.transformDtoMerchToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const DeleteMerchandising = async (authHeader, merchandisingId) => {

    let { response, data } = await MerchandisingService.deleteMerchandising(authHeader, merchandisingId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };

};