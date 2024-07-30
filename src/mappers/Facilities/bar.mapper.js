import { BarModel } from "../../models/Facilities/bar.model";
import { getTime } from "../../services/utils";

export const BarMapper = {

    transformBarDtoToModel (barDto) {
        return new BarModel (
            barDto._id,
            barDto._name,
            {lat : parseFloat(barDto._latitude), lng : parseFloat(barDto._longitude)},
            getTime(barDto._openingTimes._openAt),
            getTime(barDto._openingTimes._closeAt)         
        );
    },

};