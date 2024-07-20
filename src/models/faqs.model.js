export class FaqsModel {

    constructor(id, userName, userRole, createdAt, modifiedAt, status, question, answer) {
        this.id = id;
        this.userName = userName;
        this.userRole = userRole;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.status = status;
        this.question = question;
        this.answer = answer;
    };

};