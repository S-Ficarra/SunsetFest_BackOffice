export class RestaurantDto {

    constructor (id, name, longitude, latitude, type, foodType, openingTimes) {
        this._id = id;
        this._name = name;
        this._longitude = longitude;
        this._latitude = latitude;
        this._type = type;
        this._foodType = foodType;
        this._openingTimes = openingTimes;
    };

};