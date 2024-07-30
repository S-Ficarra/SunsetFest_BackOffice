import { CountdownService } from "../services/countdown.service";
import { CountdownMapper} from "../mappers/countdown.mapper";

export const GetAllCountdowns = async (authHeader) => {

    let response = await CountdownService.fetchAllCountdowns(authHeader);

    if (Array.isArray(response)) {
        const countdownModelsArray = response.map(dto => CountdownMapper.transformCountdownDtoToModel(dto));
        return countdownModelsArray;
    };

    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

};

export const GetCountdown = async (authHeader, countdownId) => {

    const countdownDto = await CountdownService.fetchCountdown(authHeader, countdownId);
    const countdownModel = CountdownMapper.transformCountdownDtoToModel(countdownDto);

    return countdownModel;
    
};

export const CreateCountdown = async (authHeader, newCountdown) => {

    const endingDateAndTime = new Date (`${newCountdown.date}T${newCountdown.time}`)
    const CountdownToCreate = { name: newCountdown.name, endingTime : endingDateAndTime };

    let { response, data } = await CountdownService.createCountdown(authHeader, CountdownToCreate);

    if (response.status === 200) {
        return CountdownMapper.transformCountdownDtoToModel(data);
    } else {
        throw new Error(data.message);
    };

};

export const EditCountdown = async (authHeader, editedCountdown, id) => {

    const endingDateAndTime = new Date (`${editedCountdown.date}T${editedCountdown.time}`)
    const CountdownToEdit = { name: editedCountdown.name, endingTime : endingDateAndTime };

    let { response, data } = await CountdownService.editCountdown(authHeader, id, CountdownToEdit);

    if (response.status === 200) {
        return CountdownMapper.transformCountdownDtoToModel(data);
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
};

export const DeleteCountdown = async (authHeader, countdownId) => {

    let { response, data } = await CountdownService.deleteCountdown(authHeader, countdownId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };

}
