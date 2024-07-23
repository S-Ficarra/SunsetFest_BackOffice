import { BandModel } from "../models/band.model";

export const BandMapper = {

    transformBandDtoToModel (bandDto) {
        return new BandModel (
            bandDto._id,
            bandDto._name,
            bandDto._country,
            bandDto._text,
            bandDto._thumbnailImage.data,
            bandDto._bannerImage.data,
            bandDto._socials._facebook,
            bandDto._socials._instagram,
            bandDto._socials._twitter,
            bandDto._socials._youtube,
            bandDto._socials._spotify,
            bandDto._socials._website,
            bandDto._socials._spotifyIntegrationLink,
            bandDto._socials._youtubeIntegrationLink,
            `${bandDto._user._firstName} ${bandDto._user._name}`,
            bandDto._createdAt,
            bandDto._modifiedAt
        );
    }

};