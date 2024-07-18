import { UserModel } from "../models/user.model";

export const UserMapper = {

    getRoleFromId(roleId) {
        switch (roleId) {
            case 1:
                return 'Auteur';
            case 2:
                return 'Editeur';
            case 3:
                return 'Administrateur';
            default: 
                return 'Role inconnu'
        };
    },
    
    transformUserDtoToModel(userDto) {
        const fullname = `${userDto.firstName} ${userDto.name}`;
        const role = this.getRoleFromId(userDto.role);

        return new UserModel (
            userDto.id,
            fullname,
            userDto.email,
            role
        );
    }
};