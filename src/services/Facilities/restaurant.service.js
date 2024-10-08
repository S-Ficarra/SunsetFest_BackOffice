import { BASE_URL } from "../../App";
import { RestaurantDto } from "../../dto/Facilities/restaurant.dto";


export const RestaurantService = {

    async fetchAllRestaurant (authHeader) {
        const response = await fetch (`${BASE_URL}restaurants`, {
            headers: {'Authorization': authHeader}});
        const data = await response.json();
        if (response.status === 200) {
            return data.map(restaurant => new RestaurantDto (
                restaurant._id,
                restaurant._name,
                restaurant._longitude,
                restaurant._latitude,
                restaurant._type,
                restaurant._foodType,
                restaurant._openingTimes,
            ))
        } else {
            return {response, data};
        };
    },


    async fetchRestaurant (restaurantId) {
        const response = await fetch (`${BASE_URL}restaurants/${restaurantId}`);
        const data = await response.json();
        if (response.status === 200) {
            return new RestaurantDto (
                data._id,
                data._name,
                data._longitude,
                data._latitude,
                data._type,
                data._foodType,
                data._openingTimes,
            );
        } else {
            return {response, data}; 
        };
    },

    async createRestaurant (authHeader, newRestaurant) {
        
        const response = await fetch (`${BASE_URL}restaurants/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRestaurant)
        });
        
        const data = await response.json();
        return {response, data};
    },

    async editRestaurant (authHeader, restaurantId, restaurantEdited) {
        const response = await fetch (`${BASE_URL}restaurants/${restaurantId}/edit`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restaurantEdited)
        });

        const data = await response.json();
        return {response, data};
    },

    async deleteRestaurant (authHeader, restaurantId) {
        const response = await fetch(`${BASE_URL}restaurants/${restaurantId}/delete`, {
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