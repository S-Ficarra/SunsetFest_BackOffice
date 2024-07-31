import { StagesService } from "../../services/Facilities/stages.service";
import { StageMapper } from "../../mappers/Facilities/stage.mapper";


export const GetAllStages = async (authHeader) => {

    let response = await StagesService.fetchAllStages(authHeader);

    if (Array.isArray(response)) {
        let StagesModelArray = response.map(dto => StageMapper.transformStageDtoToModel(dto));
        return StagesModelArray;
    }

    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

};

export const CreateStage = async (authHeader, newStage) => {

    let { response, data } = await StagesService.createStage(authHeader, newStage);

    if (response.status === 200) {
        return StageMapper.transformStageDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const DeleteStage = async (authHeader, stageId) => {

    let { response, data } = await StagesService.deleteStages(authHeader, stageId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };

};