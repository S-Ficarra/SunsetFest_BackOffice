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
}

export const GetUser = (authHeader, userId) => {

    const [user, setUser] = useState ({});

    useEffect(() => {
        UserService.fetchUser(authHeader, userId).then(userDto => {
            const userModel = UserMapper.transformUserDtoToModel(userDto);
            setUser(userModel);
        });
    }, [authHeader, userId]);

    return { user };

}