export class UserModel {

    constructor(id, fullName, email, role) {
        this.id = id;
        this.fullName = fullName.toUpperCase();
        this.email = email.toUpperCase();
        this.role = role;
    };
    
};