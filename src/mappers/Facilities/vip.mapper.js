import { VipModel } from "../../models/Facilities/vip.model";

export const VipMapper = {

    transformVipDtoToModel (vipDto) {
        return new VipModel (
            vipDto._id,
            vipDto._name,
            {lat : parseFloat(vipDto._latitude), lng : parseFloat(vipDto._longitude)},        
        );
    },

};