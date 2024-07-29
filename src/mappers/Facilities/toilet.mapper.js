import { ToiletModel } from "../../models/Facilities/toilet.model";

export const ToiletMapper = {

    transformToiletDtoToModel (toiletDto) {
        return new ToiletModel (
            toiletDto._id,
            toiletDto._name,
            {lat : parseFloat(toiletDto._latitude), lng : parseFloat(toiletDto._longitude)},        
        );
    },

};