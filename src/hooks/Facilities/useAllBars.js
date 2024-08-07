import { useEffect, useState } from "react";
import { GetAllBars } from "../../controllers/Facilities/bar.controller";

export const useAllBars = () => {

    const [allBars, setAllBars] = useState([]);

    useEffect(() => {
        const fetchAllBars = async () => {
            const allBars = await GetAllBars();
            setAllBars(allBars);
        };

        fetchAllBars();
    }, []);

    return { allBars };

};