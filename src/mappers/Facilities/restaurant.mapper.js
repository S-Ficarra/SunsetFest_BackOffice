import { RestaurantModel } from "../../models/Facilities/restaurant.model";
import { getTime } from "../../services/utils";


export const RestaurantMapper = {

    transformDtoRestaurantToModel (restaurantDto) {
        return new RestaurantModel (
            restaurantDto._id,
            restaurantDto._name,
            {lat : parseFloat(restaurantDto._latitude), lng : parseFloat(restaurantDto._longitude)},
            restaurantDto._foodType,
            getTime(restaurantDto._openingTimes._openAt),
            getTime(restaurantDto._openingTimes._closeAt)           
        );
    },

};