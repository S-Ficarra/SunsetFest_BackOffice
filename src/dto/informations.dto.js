export class InformationsDto {

    constructor(id, user, createdAt, modifiedAt, status, type, content) {
        this._id = id;
        this._user = user;
        this._createdAt = createdAt;
        this._modifiedAt = modifiedAt;
        this._status = status;
        this._type = type;
        this._content = content;
    };

};