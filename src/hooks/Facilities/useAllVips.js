import { useEffect, useState } from "react";
import { GetAllVips } from "../../controllers/Facilities/vip.controller";

export const useAllVips = () => {

    const [allVips, setAllVips] = useState([]);

    useEffect(() => {
        const fetchAllVips = async () => {
            const allVips = await GetAllVips();
            setAllVips(allVips);
        };

        fetchAllVips();
    }, []);

    return { allVips };

};