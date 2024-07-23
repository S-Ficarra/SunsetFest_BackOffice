import { BandService } from "../services/band.service";
import { BandMapper } from "../mappers/band.mapper";

export const GetAllBands = async (authHeader) => {

    let response = await BandService.fetchAllBands(authHeader);

    if (Array.isArray(response)) {
        const BandsModelArray = response.map(dto => BandMapper.transformBandDtoToModel(dto));
        return BandsModelArray;
    };

    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

};

export const CreateBand = async (authHeader, newBand) => {
   
    let { response, data } = await BandService.createBand(authHeader, newBand);

    if (response.status === 200) {
        return BandMapper.transformBandDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const DeleteBand = async (authHeader, bandId) => {

    let { response, data } = await BandService.deleteBand(authHeader, bandId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
}