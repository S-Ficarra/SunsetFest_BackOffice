export class BandDto {

    constructor(id, name, country, text, socials, thumbnailImage, bannerImage, user, createdAt, modifiedAt) {
        this._id = id;
        this._name = name;
        this._country = country;
        this._text = text;
        this._socials = socials;
        this._thumbnailImage = thumbnailImage;
        this._bannerImage = bannerImage;
        this._user = user;
        this._createdAt = createdAt;
        this._modifiedAt = modifiedAt;
    };

};