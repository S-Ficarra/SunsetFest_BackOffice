import { MerchandisingModel } from "../../models/Facilities/merchandising.model";

export const MerchandisingMapper = {
    
    transformDtoMerchToModel (merchDto) {
        return new MerchandisingModel (
            merchDto._id,
            merchDto._name,
            {lat : parseFloat(merchDto._latitude), lng : parseFloat(merchDto._longitude)},
            merchDto._merchType,
            new Date(merchDto._openingTimes._openAt).getHours(),
            new Date(merchDto._openingTimes._closeAt).getHours()          
        );
    },

};
