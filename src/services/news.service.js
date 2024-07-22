import { BASE_URL } from "../App";
import { IllustratedDto } from "../dto/illustrated.dto";

export const NewsService = {

    async fetchAllNews (authHeader) {
        const response = await fetch (`${BASE_URL}news`, {
            headers: {'Authorization': authHeader}});
            const data = await response.json();
        if (response.status === 200) {
            return data.map(information => new IllustratedDto (
                information._id,
                information._user,
                information._createdAt,
                information._modifiedAt,
                information._status,
                information._type,
                information._content,
            ));
        } else {
            return {response, data}; 
        };
    },

    async createNews (authHeader, newNews) {
       
        const response = await fetch (`${BASE_URL}news/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
            },
            body: newNews
        });
        
        const data = await response.json();
        console.log(data);
        return {response, data};
    },


    async deleteNews (authHeader, newsId) {
        const response = await fetch(`${BASE_URL}news/${newsId}/delete`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return {response, data}; 
    },













}