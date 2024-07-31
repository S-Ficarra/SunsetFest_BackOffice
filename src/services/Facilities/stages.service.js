import { BASE_URL } from "../../App";
import { StageDto } from "../../dto/Facilities/stage.dto";

export const StagesService = {


    async fetchAllStages (authHeader) {
        const response = await fetch (`${BASE_URL}stages`, {
            headers: {'Authorization': authHeader}});
        const data = await response.json();
        if (response.status === 200) {
            return data.map(stage => new StageDto (
                stage._id,
                stage._name,
                stage._longitude,
                stage._latitude,
                stage._type,
                stage._capacity
            ))
        } else {
            return {response, data};
        };
    },

    async createStage (authHeader, newStage) {
        
        const response = await fetch (`${BASE_URL}stages/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStage)
        });
        
        const data = await response.json();
        return {response, data};
    },

    async deleteStages (authHeader, stageId) {
        const response = await fetch(`${BASE_URL}stages/${stageId}/delete`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return {response, data}; 
    },



};