import { PerformanceModel } from "../models/performance.model"

export const PerformanceMapper = {

    transfromPerformanceDtoToModel (performanceDto) {
        return new PerformanceModel (
            performanceDto._id,
            performanceDto._band._id,
            performanceDto._band._name,
            performanceDto._stage._id,
            performanceDto._stage._name,
            performanceDto._timeFrame._id,
            performanceDto._timeFrame._startingTime,
            performanceDto._timeFrame._endingTime
        );
    }

};