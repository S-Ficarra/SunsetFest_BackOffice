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