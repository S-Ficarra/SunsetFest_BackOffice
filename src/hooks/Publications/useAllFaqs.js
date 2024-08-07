import { useState, useEffect } from "react";
import { GetAllFaqs } from "../../controllers/Publications/faqs.controller";


export const useAllFaqs = (authHeader) => {

    const [allFaqs, setAllFaqs] = useState([]);

    useEffect(() => {
        const fetchAllFaqs = async () => {
            try {
                const allFaqs = await GetAllFaqs(authHeader);
                setAllFaqs(allFaqs);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllFaqs();
    }, [authHeader]);

    return { allFaqs }
}