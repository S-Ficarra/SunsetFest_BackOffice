import { BASE_URL } from "../App"
import { UserDto } from "../dto/user.dto";


export const UserService = {

    async fetchAllUsers (authHeader) {
        const response = await fetch(`${BASE_URL}users`, {
            headers: {'Authorization': authHeader}});
        if (response.status === 200) {
            const data = await response.json();
            return data.map(user => new UserDto (
                user._id,
                user._name,
                user._firstName,
                user._email,
                user._role,
            ));
        } else {
            return response.statusText
        };    
    },

    async fetchUser (authHeader, userId) {
        const response = await fetch (`${BASE_URL}users/${userId}`, {
            headers: {'Authorization' : authHeader}});
        if (response.status === 200) {
            const data = await response.json();
            return new UserDto (
                data._id,
                data._name,
                data._firstName,
                data._email,
                data._role,
            );
        } else {
            return response.statusText
        };
    },

    async createUser (authHeader, newUser) {
        
        const response = await fetch (`${BASE_URL}users/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        
        const data = await response.json();
        return {response, data};
    },

    async editUser (authHeader, userId, userEdited) {
        const response = await fetch (`${BASE_URL}users/${userId}/edit`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userEdited)
        });

        const data = await response.json();
        return {response, data};
    },


    async deleteUser (authHeader, userId) {
        const response = await fetch(`${BASE_URL}users/${userId}/delete`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return {response, data}; 
    },

};