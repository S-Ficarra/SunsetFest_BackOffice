import { useState, useEffect } from "react";
import { GetProgramByYear } from "../controllers/program.controller";

export const useProgram = (authHeader, year) => {

    const [performances, setPerformances] = useState([])

    useEffect(() => {
        const fetchProgram = async () => {
            const program = await GetProgramByYear(authHeader, year);
            setPerformances(program.performances)
        };

        fetchProgram();
      }, [authHeader, year]);

    return { performances }
}