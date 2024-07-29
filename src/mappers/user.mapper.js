import { CreateUserDto } from "../dto/user.dto";
import { UserModel } from "../models/user.model";

export const UserMapper = {

    getRoleName(roleId) {
        switch (roleId) {
            case 1:
                return 'Auteur';
            case 2:
                return 'Editeur';
            case 3:
                return 'Administrateur';
            default:
                return 'Auteur';
        };
    },

    getRoleId (roleName) {
        switch (roleName) {
            case 'Auteur':
                return '1';
            case 'Editeur':
                return '2';
            case 'Administrateur':
                return '3';
            default :
                return '1';
        };
    },
    
    transformUserDtoToModel(userDto) {
        const role = this.getRoleName(parseInt(userDto._role));

        return new UserModel (
            userDto._id,
            userDto._firstName,
            userDto._name,
            userDto._email,
            role
        );
    },

    transformUserDataToDto (name, firstName, email, password, role) {
        const newUser = new CreateUserDto (
            name,
            firstName,
            email,
            password,
            role
        );

        return newUser
    },
};