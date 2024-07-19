export class UserModel {

    constructor(id, firstName, name, email, role) {
        this.id = id;
        this.firstName = firstName.toUpperCase();
        this.name = name.toUpperCase();
        this.email = email.toUpperCase();
        this.role = role;
    };
    
};