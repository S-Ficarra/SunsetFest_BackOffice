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