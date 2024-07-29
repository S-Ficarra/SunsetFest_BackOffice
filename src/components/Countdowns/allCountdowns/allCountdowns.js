import React, { useState, useEffect } from "react";
import './allCountdowns.css'
import { GetAllCountdowns } from "../../../controllers/countdown.controller";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";



function AllCountdowns () {

    const authHeader = useAuthHeader();

    const [allCountdowns, setAllCountdowns] = useState([]);
    useEffect(() => {
        const fetchAllCountdowns = async () => {
            try {
                const allCountdowns = await GetAllCountdowns(authHeader);
                setAllCountdowns(allCountdowns);
            } catch (error) {
                console.log(error)
            }
        };

        fetchAllCountdowns();
    }, [authHeader]);


    if (allCountdowns.length === 0) {
        return (
            <>
                <div className="EmptyTitle">
                    <h2>Il n'y a aucun compte à rebours pour le moment</h2>
                </div>
            </>
        )
    }


    return (
        <div>{allCountdowns[0].name}</div>
    );

};
export default AllCountdowns;