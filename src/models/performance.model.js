export class PerformanceModel {

    constructor (id, bandName, bandId, stageName, stageId, timeFrameId, startingTime, endingTime) {
        this.id = id,
        this.bandId = bandId,
        this.bandName = bandName,
        this.stageId = stageId,
        this.stageName = stageName,
        this.timeFrameId = timeFrameId
        this.startingTime = startingTime,
        this.endingTime = endingTime
    };

};