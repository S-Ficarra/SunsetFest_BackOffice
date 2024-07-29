import { CampingModel } from "../../models/Facilities/camping.model";

export const CampingMapper = {

    transformCampingDtoToModel (campingDto) {
        return new CampingModel (
            campingDto._id,
            campingDto._name,
            {lat : parseFloat(campingDto._latitude), lng : parseFloat(campingDto._longitude)},           
            campingDto._capacity  
        );
    },

};