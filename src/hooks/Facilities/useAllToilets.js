import { useEffect, useState } from "react";
import { GetAllToilets } from "../../controllers/Facilities/toilet.controller";

export const useAllToilets = () => {

    const [allToilets, setAllToilets] = useState([]);

    useEffect(() => {
        const fetchAllToilets = async () => {
            const allToilets = await GetAllToilets();
            setAllToilets(allToilets);
        };

    fetchAllToilets();
    }, []);

    return { allToilets };

};