import { useState, useEffect } from "react";
import { GetAllBands } from "../controllers/band.controller";

export const useAllBands = (authHeader) => {

    const [allBands, setAllBands] = useState([]);
    
    useEffect(() => {
        const fetchAllBands= async () => {
            try {
                const allBands = await GetAllBands(authHeader);
                setAllBands(allBands);
            } catch (error) {
                console.log(error)
            }
        };

        fetchAllBands();
    }, [authHeader]);

    return { allBands };
}