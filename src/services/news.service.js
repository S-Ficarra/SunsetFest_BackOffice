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
    }













}