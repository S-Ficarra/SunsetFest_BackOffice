import { BASE_URL } from "../App";
import { ProgramDto } from "../dto/program.dto";

export const ProgramService = {

    async fetchProgramByYear (authHeader, year) {
        const response = await fetch (`${BASE_URL}programs/${year}`, {
            headers: {'Authorization': authHeader}});
        const data = await response.json();
        if (response.status === 200) {
            return new ProgramDto (
                data._id,
                data._performances
            )
        } else {
            return {response, data}; 
        };
    },

    async addPerformanceToProgram (authHeader, year, performanceId) {

        const perfId = performanceId.toString()
        const response = await fetch(`${BASE_URL}programs/${year}/addperformance`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ performanceId: perfId })
        });

        const data = await response.json();
        return {response, data}; 

    }, 

    async deletePerformanceFromProgram (authHeader, year, performanceId) {
        
        const perfId = performanceId.toString()
        const response = await fetch(`${BASE_URL}programs/${year}/deleteperformance`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({performanceId: perfId})
        });

        const data = await response.json();
        return {response, data}; 

    }, 




};