import { BASE_URL } from "../App";
import { FaqsDto } from "../dto/faqs.dto";

export const FaqsService = {

    async fetchAllFaqs (authHeader) {
        const response = await fetch (`${BASE_URL}faqs`, {
            headers: {'Authorization': authHeader}});
            const data = await response.json();
        if (response.status === 200) {
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
            return {response, data}; 
        };
    },

    async fetchFaq (authHeader, faqId) {
        const response = await fetch (`${BASE_URL}faqs/${faqId}`, {
            headers: {'Authorization': authHeader}});
            const data = await response.json();
        if (response.status === 200) {
            return new FaqsDto (
                data._id,
                data._user,
                data._createdAt,
                data._modifiedAt,
                data._status,
                data._type,
                data._question,
                data._answer
            );
        } else {
            return response.statusText
        };
    },

    async createFaq (authHeader, newFaq) {
        
        const response = await fetch (`${BASE_URL}faqs/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFaq)
        });
        
        const data = await response.json();
        return {response, data};
    },

    async editFaq (authHeader, faqId, faqEdited) {
        const response = await fetch (`${BASE_URL}faqs/${faqId}/edit`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(faqEdited)
        });

        const data = await response.json();
        return {response, data};
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