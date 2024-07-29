import { CountdownModel } from "../models/countdown.model"

export const CountdownMapper = {

    transformCountdownDtoToModel (countdownDto) {
        return new CountdownModel (
            countdownDto._id,
            countdownDto._name,
            countdownDto._startingDateAndTime,
            countdownDto._endingDateAndTime
        );
    },

};