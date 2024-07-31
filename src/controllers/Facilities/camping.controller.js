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

export const CreateCamping = async (authHeader, newCamping) => {

    let { response, data } = await CampingService.createCamping(authHeader, newCamping);

    if (response.status === 200) {
        return CampingMapper.transformCampingDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const DeleteCamping = async (authHeader, campingId) => {

    let { response, data } = await CampingService.deleteCamping(authHeader, campingId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };

};
