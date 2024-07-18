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
        };
    },
    
    transformUserDtoToModel(userDto) {
        const fullname = `${userDto._name} ${userDto._firstName}`;
        const role = this.getRoleName(parseInt(userDto._role));

        return new UserModel (
            userDto._id,
            fullname,
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