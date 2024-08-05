import { RestaurantService } from "../../services/Facilities/restaurant.service";
import { RestaurantMapper } from "../../mappers/Facilities/restaurant.mapper";


export const GetAllRestaurants = async (authHeader) => {

    let response = await RestaurantService.fetchAllRestaurant(authHeader);

    if (Array.isArray(response)) {
        let restaurantModelArray = response.map(dto => RestaurantMapper.transformDtoRestaurantToModel(dto));
        return restaurantModelArray;
    }

    throw new Error(`Error: ${response.data.message} Status code: ${response.response.status} ${response.response.statusText}`);

};

export const GetRestaurant = async (restaurantId) => {

    const restaurantDto = await RestaurantService.fetchRestaurant(restaurantId);
    const restaurantModel = RestaurantMapper.transformDtoRestaurantToModel(restaurantDto);

    return restaurantModel;
};

export const CreateRestaurant = async (authHeader, newRestaurant) => {

    let { response, data } = await RestaurantService.createRestaurant(authHeader, newRestaurant);

    if (response.status === 200) {
        return RestaurantMapper.transformDtoRestaurantToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const EditRestaurant = async (authHeader, id, restaurantEdited) => {

    let { response, data } = await RestaurantService.editRestaurant(authHeader, id, restaurantEdited);

    if (response.status === 200) {
        return RestaurantMapper.transformDtoRestaurantToModel(data);
    } else {
        throw new Error(data.message);
    };
};

export const DeleteRestaurant = async (authHeader, restaurantId) => {

    let { response, data } = await RestaurantService.deleteRestaurant(authHeader, restaurantId);

    if (response.status === 200) {
        return data; 
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };

};