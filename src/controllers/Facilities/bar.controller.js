import { BarService } from "../../services/Facilities/bar.service";
import { BarMapper } from "../../mappers/Facilities/bar.mapper";


export const GetAllBars = async (authHeader) => {

    let response = await BarService.fetchAllBar(authHeader);

    if (Array.isArray(response)) {
        let barsModelArray = response.map(dto => BarMapper.transformBarDtoToModel(dto));
        return barsModelArray;
    }

    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

};

export const GetBar = async (barId) => {

    const barDto = await BarService.fetchBar(barId);
    const barModel = BarMapper.transformBarDtoToModel(barDto);

    return barModel;
};

export const CreateBar = async (authHeader, newBar) => {

    let { response, data } = await BarService.createBar(authHeader, newBar);

    if (response.status === 200) {
        return BarMapper.transformBarDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const EditBar = async (authHeader, id, barEdited) => {

    let { response, data } = await BarService.editBar(authHeader, id, barEdited);

    if (response.status === 200) {
        return BarMapper.transformBarDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};


export const DeleteBar = async (authHeader, barId) => {

    let { response, data } = await BarService.deleteBar(authHeader, barId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };

};