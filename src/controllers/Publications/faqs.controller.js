import { FaqsService } from "../../services/Publications/faqs.service";
import { FaqsMapper } from "../../mappers/Publications/faqs.mapper";

export const GetAllFaqs = async (authHeader) => {

    let response = await FaqsService.fetchAllFaqs(authHeader);
    
    if (Array.isArray(response)) {
        const faqsModelsArray = response.map(dto => FaqsMapper.transformFaqsDtoToModel(dto));
        return faqsModelsArray;
    }

    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

};

export const GetFaq = async (authHeader, faqId) => {

    const faqDto = await FaqsService.fetchFaq (authHeader, faqId);
    const faqModel = FaqsMapper.transformFaqsDtoToModel(faqDto);

    return faqModel;
};

export const CreateFaq = async (authHeader, newFaq) => {

    let { response, data } = await FaqsService.createFaq(authHeader, newFaq);

    if (response.status === 200) {
        return FaqsMapper.transformFaqsDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const EditFaq = async (authHeader, formData, id) => {

    let { response, data } = await FaqsService.editFaq(authHeader, id, formData);

    if (response.status === 200) {
        return FaqsMapper.transformFaqsDtoToModel(data);
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
};


export const DeleteFaq = async (authHeader, faqId) => {

    let { response, data } = await FaqsService.deleteFaq(authHeader, faqId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
}