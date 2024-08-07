import { useEffect, useState } from "react";
import { GetAllRestaurants } from "../../controllers/Facilities/restaurant.controller";

export const useAllRestaurants = () => {

    const [allRestaurants, setAllRestaurants] = useState([]);

    useEffect(() => {
        const fetchAllRestaurants = async () => {
            const allRestaurants = await GetAllRestaurants();
            setAllRestaurants(allRestaurants);
        };

        fetchAllRestaurants();
    }, []);

    return { allRestaurants };

};