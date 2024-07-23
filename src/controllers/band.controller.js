import { BandService } from "../services/band.service";
import { BandMapper } from "../mappers/band.mapper";

export const GetAllBands = async (authHeader) => {

    let response = await BandService.fetchAllBands(authHeader);

    if (Array.isArray(response)) {
        const BandsModelArray = response.map(dto => BandMapper.transformBandDtoToModel(dto));
        return BandsModelArray;
    };

    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

}