export class UserDto {

    constructor(id, name, firstName, email, role) {
        this._id = id;
        this._name = name;
        this._firstName = firstName;
        this._email = email;
        this._role = role;
    };

};

export class CreateUserDto {
    constructor(name, firstName, email, password, role) {
        this.name = name;
        this.firstName = firstName;
        this.email = email;
        this.password = password
        this.role = role;
    };
};