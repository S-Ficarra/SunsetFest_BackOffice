import { FaqsService } from "../services/faqs.service";
import { FaqsMapper } from "../mappers/faqs.mapper";

export const GetAllFaqs = async (authHeader) => {

    const faqsDtoArray = await FaqsService.fetchAllFaqs(authHeader);
    const faqsModelsArray = faqsDtoArray.map(dto => FaqsMapper.transformFaqsDtoToModel(dto));

    return faqsModelsArray;
};

export const DeleteFaq = async (authHeader, faqId) => {

    let { response, data } = await FaqsService.deleteFaq(authHeader, faqId);
    console.log(response, data);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
}