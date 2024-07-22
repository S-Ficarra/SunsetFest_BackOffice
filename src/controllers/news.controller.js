import { NewsService } from "../services/news.service";
import { IllustratedMapper } from "../mappers/illustrated.mapper";

export const GetAllNews = async (authHeader) => {

    let response = await NewsService.fetchAllNews(authHeader);
    
    if (Array.isArray(response)) {
        const NewssModelArray = response.map(dto => IllustratedMapper.transformIllustratedDtoToModel(dto));
        return NewssModelArray;
    }
    
    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

};


export const DeleteNews = async (authHeader, newsId) => {

    let { response, data } = await NewsService.deleteNews(authHeader, newsId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
}