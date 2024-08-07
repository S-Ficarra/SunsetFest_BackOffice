import { useState, useEffect } from "react";
import { GetUser } from "../controllers/user.controller";

export const useUser = (authHeader, userId) => {

    const [userLogged, setUserLogged] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const user = await GetUser(authHeader, userId);
            setUserLogged(user)
        };

        fetchUser();
    }, [authHeader, userId]);


    return {userLogged}

}