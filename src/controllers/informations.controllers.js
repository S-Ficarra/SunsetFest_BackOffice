import { InformationssService } from "../services/informations.service";
import { InformationsMapper } from "../mappers/Informations.mapper";

export const GetAllInformations = async (authHeader) => {
    let { response, data } = await InformationssService.fetchAllInformations(authHeader);
    
    if (Array.isArray(data)) {
        const InformationsModelArray = data.map(dto => InformationsMapper.transformInformationDtoToModel(dto));
        return InformationsModelArray;
    }
    
    throw new Error(`Error: ${data.message} Status code: ${response.status} ${response.statusText}`);
};

export const DeleteInformation = async (authHeader, informationId) => {

    let { response, data } = await InformationssService.deleteInformation(authHeader, informationId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
}