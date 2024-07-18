import { BASE_URL } from "../App"
import { UserDto } from "../dto/user.dto";


export const UserService = {

    async fetchAllUsers (authHeader) {
        const response = await fetch(`${BASE_URL}users`, {
            headers: {'Authorization': authHeader}});
        if (response.status === 401) {
            return response.statusText
        } else {
            const data = await response.json();
            return data.map(user => new UserDto (
                user._id,
                user._name,
                user._firstName,
                user._email,
                user._role,
            ));
        };    
    },

    async fetchUser (authHeader, userId) {

            const response = await fetch (`${BASE_URL}users/${userId}`, {
                headers: {'Authorization' : authHeader}});
            if (response.status === 401) {
                return response.statusText
            } else {
                const user = await response.json();
                return new UserDto (
                    user._id,
                    user._name,
                    user._firstName,
                    user._email,
                    user._role,
                )
            }
    },

};