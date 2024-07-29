import { NewsService } from "../../services/Publications/news.service";
import { IllustratedMapper } from "../../mappers/Publications/illustrated.mapper";

export const GetAllNews = async (authHeader) => {

    let response = await NewsService.fetchAllNews(authHeader);
    
    if (Array.isArray(response)) {
        const NewssModelArray = response.map(dto => IllustratedMapper.transformIllustratedDtoToModel(dto));
        return NewssModelArray.reverse();
    }
    
    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

};

export const GetNews = async (authHeader, newsId) => {

    const newsDto = await NewsService.fetchNews(authHeader, newsId);
    const newsModel = IllustratedMapper.transformIllustratedDtoToModel(newsDto);

    return newsModel;
};

export const CreateNews = async (authHeader, newNews) => {
   
    let { response, data } = await NewsService.createNews(authHeader, newNews);

    if (response.status === 200) {
        return IllustratedMapper.transformIllustratedDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const EditNews = async (authHeader, editedNews, id) => {

    let { response, data } = await NewsService.editNews(authHeader, id, editedNews);

    if (response.status === 200) {
        return IllustratedMapper.transformIllustratedDtoToModel(data);
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
};


export const DeleteNews = async (authHeader, newsId) => {

    let { response, data } = await NewsService.deleteNews(authHeader, newsId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
}