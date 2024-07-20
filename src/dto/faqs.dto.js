export class FaqsDto {

    constructor(id, user, createdAt, modifiedAt, status, type, question, answer) {
        this._id = id;
        this._user = user;
        this._createdAt = createdAt;
        this._modifiedAt = modifiedAt;
        this._status = status;
        this._type = type;
        this._question = question;
        this._answer = answer;
    };

};

export class CreateFaqsDto {

    constructor(question, answer, status) {
        this.question = question;
        this.answer = answer;
        this.status = status;
    };

};