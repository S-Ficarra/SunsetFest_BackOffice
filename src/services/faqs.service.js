import { BASE_URL } from "../App";
import { FaqsDto } from "../dto/faqs.dto";

export const FaqsService = {

    async fetchAllFaqs (authHeader) {
        const response = await fetch (`${BASE_URL}faqs`, {
            headers: {'Authorization': authHeader}});
        if (response.status === 200) {
            const data = await response.json();
            return data.map(faqs => new FaqsDto (
                faqs._id,
                faqs._user,
                faqs._createdAt,
                faqs._modifiedAt,
                faqs._status,
                faqs._type,
                faqs._question,
                faqs._answer
            ));
        } else {
            return response.statusText
        };
    },

    async deleteFaq (authHeader, faqId) {
        const response = await fetch(`${BASE_URL}faqs/${faqId}/delete`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return {response, data}; 
    },

};