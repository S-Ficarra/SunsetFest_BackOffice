import { InformationsModel} from "../models/informations.model";

export const InformationsMapper = {

    transformInformationDtoToModel (informationsDto) {
        return new InformationsModel (
            informationsDto._id,
            `${informationsDto._user._firstName} ${informationsDto._user._name}`,
            informationsDto._user._role,
            informationsDto._createdAt,
            informationsDto._modifiedAt,
            informationsDto._status,
            informationsDto._content._title,
            informationsDto._content._text,
            informationsDto._content._image.data
        );
    },

};