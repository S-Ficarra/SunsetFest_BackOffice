import { BarModel } from "../../models/Facilities/bar.model";

export const BarMapper = {

    transformBarDtoToModel (barDto) {
        return new BarModel (
            barDto._id,
            barDto._name,
            {lat : parseFloat(barDto._latitude), lng : parseFloat(barDto._longitude)},
            new Date(barDto._openingTimes._openAt).getHours(),
            new Date(barDto._openingTimes._closeAt).getHours()          
        );
    },

};