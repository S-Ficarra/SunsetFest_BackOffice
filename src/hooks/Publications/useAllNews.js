import { useState, useEffect } from "react";
import { GetAllNews } from "../../controllers/Publications/news.controller";

export const useAllNews = (authHeader) => {

    const [allNews, setAllNews] = useState([]);
    useEffect(() => {
        const fetchAllNews= async () => {
            try {
                const allNews = await GetAllNews(authHeader);
                setAllNews(allNews);
            } catch (error) {
                console.log(error)
            }
        };

        fetchAllNews();
    }, [authHeader]);

    return { allNews }
}