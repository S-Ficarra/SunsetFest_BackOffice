import { useState, useEffect } from "react";
import { GetAllInformations } from "../../controllers/Publications/informations.controller";

export const useAllInformations = (authHeader) => {

    const [allInformations, setAllInformations] = useState([]);
    
    useEffect(() => {
        const fetchAllInformations= async () => {
            try {
                const allInformations = await GetAllInformations(authHeader);
                setAllInformations(allInformations);
            } catch (error) {
                console.log(error)
            }
        };

        fetchAllInformations();
    }, [authHeader]);

    return { allInformations }
}