import { InformationssService } from "../../services/Publications/informations.service";
import { IllustratedMapper } from "../../mappers/Publications/illustrated.mapper";

export const GetAllInformations = async (authHeader) => {

    let response = await InformationssService.fetchAllInformations(authHeader);
    
    if (Array.isArray(response)) {
        const InformationsModelArray = response.map(dto => IllustratedMapper.transformIllustratedDtoToModel(dto));
        return InformationsModelArray;
    }
    
    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);
};

export const GetInformation = async (authHeader, informationId) => {

    const informationDto = await InformationssService.fetchInformation(authHeader, informationId);
    const informationModel = IllustratedMapper.transformIllustratedDtoToModel(informationDto);

    return informationModel;
};

export const CreateInformation = async (authHeader, newInformation) => {
   
    let { response, data } = await InformationssService.createInformation(authHeader, newInformation);

    if (response.status === 200) {
        return IllustratedMapper.transformIllustratedDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const EditInformation = async (authHeader, editedInformation, id) => {

    let { response, data } = await InformationssService.editInformation(authHeader, id, editedInformation);

    if (response.status === 200) {
        return IllustratedMapper.transformIllustratedDtoToModel(data);
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
};


export const DeleteInformation = async (authHeader, informationId) => {

    let { response, data } = await InformationssService.deleteInformation(authHeader, informationId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
}