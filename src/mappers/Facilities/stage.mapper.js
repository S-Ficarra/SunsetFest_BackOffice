import { StageModel } from "../../models/Facilities/stage.model";

export const StageMapper = {

    transformStageDtoToModel (stageDto) {
        return new StageModel (
            stageDto._id,
            stageDto._name,
            {lat : parseFloat(stageDto._latitude), lng : parseFloat(stageDto._longitude)},           
            stageDto._capacity  
        );
    },

};