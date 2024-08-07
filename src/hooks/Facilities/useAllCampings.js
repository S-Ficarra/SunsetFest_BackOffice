import { useEffect, useState } from "react";
import { GetAllCamping } from "../../controllers/Facilities/camping.controller";

export const useAllCampings = () => {

    const [allCampings, setAllCampings] = useState([]);

    useEffect(() => {
        const fetchAllCampings = async () => {
            const allCampings = await GetAllCamping();
            setAllCampings(allCampings);
        };

        fetchAllCampings();
    }, []);

    return { allCampings };

};