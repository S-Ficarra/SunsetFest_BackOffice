import { useEffect, useState } from "react";
import { GetAllMerchandisings } from "../../controllers/Facilities/merchandising.controller";

export const useAllMerchandisings = () => {

    const [allMerchandisings, setAllMerchandisings] = useState([]);

    useEffect(() => {
        const fetchAllMerchandisings = async () => {
            const allMerchandisings = await GetAllMerchandisings();
            setAllMerchandisings(allMerchandisings);
        };

        fetchAllMerchandisings();
    }, []);

    return { allMerchandisings };

};