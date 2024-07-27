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

    async addPerformanceToProgram (authHeader, year, performanceIdStr) {
        
        const response = await fetch(`${BASE_URL}programs/${year}/addperformance`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader},
            body: JSON.stringify({performanceId: performanceIdStr})
        });

        const data = await response.json();
        return {response, data}; 

    }, 

    async deletePerformanceFromProgram (authHeader, year, performanceIdStr) {
        
        const response = await fetch(`${BASE_URL}programs/${year}/deleteperformance`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
            },
            body: JSON.stringify({performanceId: performanceIdStr})
        });

        const data = await response.json();
        return {response, data}; 

    }, 




};