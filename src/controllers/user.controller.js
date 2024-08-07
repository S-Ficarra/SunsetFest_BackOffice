import { UserService } from '../services/user.service';
import { UserMapper } from '../mappers/user.mapper';

export const GetAllUser = async (authHeader) => {

    const userDtoArray = await UserService.fetchAllUsers(authHeader);
    const userModelsArray = userDtoArray.map(dto => UserMapper.transformUserDtoToModel(dto));

    return userModelsArray;
};

export const GetUser = async (authHeader, userId) => {

    const userDto = await UserService.fetchUser(authHeader, userId);
    const userModel = UserMapper.transformUserDtoToModel(userDto);

    return userModel;
};

export const CreateUser = async (authHeader, name, firstName, email, password, role) => {

    const newUser = UserMapper.transformUserDataToDto(name, firstName, email, password, role);
    let { response, data } = await UserService.createUser(authHeader, newUser);

    if (response.status === 200) {
        return UserMapper.transformUserDtoToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const EditUser = async (authHeader, formData, id) => {

    const userEdited = UserMapper.transformUserDataToDto(formData.name, formData.firstName, formData.email, formData.password, formData.role);
    let { response, data } = await UserService.editUser(authHeader, id, userEdited);

    if (response.status === 200) {
        return UserMapper.transformUserDtoToModel(data);
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
};

export const DeleteUser = async (authHeader, userId) => {

    let { response, data } = await UserService.deleteUser(authHeader, userId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
};