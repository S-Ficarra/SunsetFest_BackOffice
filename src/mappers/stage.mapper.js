import { StageModel } from "../models/stage.model";

export const StageMapper = {

    transformStageDtoToModel (stageDto) {
        return new StageModel (
            stageDto._id,
            stageDto._name,
            stageDto._longitude,
            stageDto._latitude,
            stageDto.capacity
        );
    },

};