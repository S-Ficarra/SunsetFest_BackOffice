import { MerchandisingModel } from "../../models/Facilities/merchandising.model";
import { getTime } from "../../services/utils";

export const MerchandisingMapper = {
    
    transformDtoMerchToModel (merchDto) {
        return new MerchandisingModel (
            merchDto._id,
            merchDto._name,
            {lat : parseFloat(merchDto._latitude), lng : parseFloat(merchDto._longitude)},
            merchDto._merchType,
            getTime(merchDto._openingTimes._openAt),
            getTime(merchDto._openingTimes._closeAt)         
        );
    },

};
