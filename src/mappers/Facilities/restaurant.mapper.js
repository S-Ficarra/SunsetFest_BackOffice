import { RestaurantModel } from "../../models/Facilities/restaurant.model";

export const RestaurantMapper = {

    transformDtoRestaurantToModel (restaurantDto) {
        return new RestaurantModel (
            restaurantDto._id,
            restaurantDto._name,
            {lat : parseFloat(restaurantDto._latitude), lng : parseFloat(restaurantDto._longitude)},
            restaurantDto._foodType,
            new Date(restaurantDto._openingTimes._openAt).getHours(),
            new Date(restaurantDto._openingTimes._closeAt).getHours()          
        );
    },

};