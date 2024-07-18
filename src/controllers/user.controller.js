import { useState, useEffect } from 'react';
import { UserService } from '../services/user.service';
import { UserMapper } from '../mappers/user.mapper';

export const GetAllUser = (authHeader) => {

    const [users, setUsers] = useState ([]);

    useEffect(() => {
        UserService.fetchAllUsers(authHeader).then(usersDto => {
            const userModels = usersDto.map(dto => UserMapper.transformUserDtoToModel(dto));
            setUsers(userModels);
        }); 
    }, [authHeader]);

    return { users } 
};

export const GetUser = (authHeader, userId) => {

    const [user, setUser] = useState ({});

    useEffect(() => {
        UserService.fetchUser(authHeader, userId).then(userDto => {
            const userModel = UserMapper.transformUserDtoToModel(userDto);
            setUser(userModel);
        });
    }, [authHeader, userId]);

    return { user };

};

export const CreateUser = async (authHeader, name, firstName, email, password, role) => {

    const newUser = UserMapper.transformUserDataToDto(name, firstName, email, password, role)
    let response = await UserService.createUser(authHeader, newUser);

    if (response.response.status === 400) {
        return null
    };

    if (response.response.status === 200) {
        return UserMapper.transformUserDtoToModel(response.responseData)
    }
};

export const DeleteUser = async (authHeader, userId) => {

    const response = await UserService.deleteUser(authHeader, userId);

    if (response.response.status === 200) {
        return response; 
    } else {
        throw new Error(`Failed to delete user. Status code: ${response.status}`);
    }



}