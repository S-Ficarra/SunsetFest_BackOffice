import { ProgramService } from "../services/program.service";
import { PerformanceServices } from "../services/performances.services";
import { ProgramMapper } from "../mappers/program.mapper";

export const GetProgramByYear = async (authHeader, year) => {

    let programDto = await ProgramService.fetchProgramByYear(authHeader, year)
    let programModel = ProgramMapper.transformProgramDtoToModel(programDto);

    return programModel;

};

export const AddPerformanceToProgram = async (authHeader, year, performanceId) => {
    
    let { response : perfResponse, data : perfData } = await PerformanceServices.createPerformance(authHeader, performanceId);
    let { response: progResponse, data :progData } = await ProgramService.addPerformanceToProgram(authHeader, year, perfData._id.toString());

    if (perfResponse.status === 200 && progResponse.status === 200) {
        return {perfData, progData}; 
    } else {
        throw new Error(`Performance error: ${perfData.message} (Status: ${perfResponse.status} ${perfResponse.statusText}). 
                        Program error: ${progData.message} (Status: ${progResponse.status} ${progResponse.statusText})`);
    };

};


export const DeletePerformanceFromProgram = async (authHeader, year, performanceId) => {

    let { response : perfResponse, data : perfData } = await ProgramService.deletePerformanceFromProgram(authHeader, year, performanceId);
    let { response: progResponse, data :progData } = await PerformanceServices.deletePerformance(authHeader, performanceId.toString());

    if (perfResponse.status === 200 && progResponse.status === 200) {
        return {perfData, progData}; 
    } else {
        throw new Error(`Performance error: ${perfData.message} (Status: ${perfResponse.status} ${perfResponse.statusText}). 
                        Program error: ${progData.message} (Status: ${progResponse.status} ${progResponse.statusText})`);
    };

};