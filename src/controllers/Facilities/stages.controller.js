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