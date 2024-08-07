import { useEffect, useState } from "react";
import { GetAllStages } from "../../controllers/Facilities/stages.controller";

export const useAllStages = () => {

    const [allStages, setAllStages] = useState([]);

    useEffect(() => {
        const fetchAllStages = async () => {
            const stages = await GetAllStages();
            setAllStages(stages);
        };

    fetchAllStages();
    }, []);

    return { allStages };

};