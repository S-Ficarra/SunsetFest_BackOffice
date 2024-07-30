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