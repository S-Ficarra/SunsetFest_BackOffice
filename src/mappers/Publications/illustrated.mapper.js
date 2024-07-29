import { IllustratedModel} from "../../models/Publications/illustrated.model";

export const IllustratedMapper = {

    transformIllustratedDtoToModel (illustratedDto) {
        return new IllustratedModel (
            illustratedDto._id,
            `${illustratedDto._user._firstName} ${illustratedDto._user._name}`,
            illustratedDto._user._role,
            illustratedDto._createdAt,
            illustratedDto._modifiedAt,
            illustratedDto._status,
            illustratedDto._content._title,
            illustratedDto._content._text,
            illustratedDto._content._image.data
        );
    },

};