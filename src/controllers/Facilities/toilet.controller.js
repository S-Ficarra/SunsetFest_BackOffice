import { ToiletService } from "../../services/Facilities/toilets.service";
import { ToiletMapper } from "../../mappers/Facilities/toilet.mapper";

export const GetAllToilets = async (authHeader) => {

    let response = await ToiletService.fetchAllToilets(authHeader);

    if (Array.isArray(response)) {
        let ToiletModelArray = response.map(dto => ToiletMapper.transformToiletDtoToModel(dto));
        return ToiletModelArray;
    }

    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

};

export const GetToilet = async (toiletId) => {

    const toiletDto = await ToiletService.fetchToilet(toiletId);
    const toiletModel = ToiletMapper.transformToiletDtoToModel(toiletDto);

    return toiletModel;
};

export const CreateToilet = async (authHeader, newToilet) => {

    let { response, data } = await ToiletService.createToilet(authHeader, newToilet);

    if (response.status === 200) {
        return ToiletMapper.transformToiletDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const EditToilet = async (authHeader, id, toiletEdited) => {

    let { response, data } = await ToiletService.editToilet(authHeader, id, toiletEdited);

    if (response.status === 200) {
        return ToiletMapper.transformToiletDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const DeleteToilet = async (authHeader, toiletId) => {

    let { response, data } = await ToiletService.deleteToilet(authHeader, toiletId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };

};