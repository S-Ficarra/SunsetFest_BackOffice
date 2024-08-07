import { useState, useEffect } from "react";
import { GetAllCountdowns } from "../controllers/countdown.controller";

export const useAllCountdowns = (authHeader) => {

    const [allCountdowns, setAllCountdowns] = useState([]);
    
    useEffect(() => {
        const fetchAllCountdowns = async () => {
            try {
                const allCountdowns = await GetAllCountdowns(authHeader);
                setAllCountdowns(allCountdowns);
            } catch (error) {
                console.log(error)
            }
        };

        fetchAllCountdowns();
    }, [authHeader]);

    return { allCountdowns };

}