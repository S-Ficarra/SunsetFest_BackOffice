import { ProgramModel } from "../models/program.model"

export const ProgramMapper = {

    transformProgramDtoToModel (programDto) {
        return new ProgramModel (
            programDto._id,
            programDto._performances
        );
    }

};