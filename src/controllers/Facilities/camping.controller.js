import { CampingMapper } from "../../mappers/Facilities/camping.mapper";
import { CampingService } from "../../services/Facilities/camping.service";

export const GetAllCamping = async (authHeader) => {

    let response = await CampingService.fetchAllCampings(authHeader);

    if (Array.isArray(response)) {
        let campingModelsArray = response.map(dto => CampingMapper.transformCampingDtoToModel(dto));
        return campingModelsArray;
    }

    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

};
