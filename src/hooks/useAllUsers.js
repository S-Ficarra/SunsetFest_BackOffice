import { useState, useEffect } from "react";
import { GetAllUser } from "../controllers/user.controller";

export const useAllUsers = (authHeader) => {

    const [allUsers, setAllUsers] = useState([]);
    
    useEffect(() => {
        const fetchAllUser = async () => {
            const allUsers = await GetAllUser(authHeader);
            setAllUsers(allUsers)
        };

        fetchAllUser();
      }, [authHeader]);

      return { allUsers }
}