import { GetBar, CreateBar, EditBar } from "../../controllers/Facilities/bar.controller";
import { GetCamping, CreateCamping, EditCamping } from "../../controllers/Facilities/camping.controller";
import { GetMerchandising, CreateMerchandising, EditMerchandising } from "../../controllers/Facilities/merchandising.controller";
import { GetRestaurant, CreateRestaurant, EditRestaurant } from "../../controllers/Facilities/restaurant.controller";
import { GetStage, CreateStage, EditStage } from "../../controllers/Facilities/stages.controller";
import { GetToilet, CreateToilet, EditToilet } from "../../controllers/Facilities/toilet.controller";
import { GetVip, CreateVip, EditVip } from "../../controllers/Facilities/vip.controller";

export const controllers = {
    bar: {
        get: GetBar,
        create: CreateBar,
        edit: EditBar
    },
    camping: {
        get: GetCamping,
        create: CreateCamping,
        edit: EditCamping
    },
    merchandising: {
        get: GetMerchandising,
        create: CreateMerchandising,
        edit: EditMerchandising
    },
    restaurant: {
        get: GetRestaurant,
        create: CreateRestaurant,
        edit: EditRestaurant
    },
    stage: {
        get: GetStage,
        create: CreateStage,
        edit: EditStage
    },
    toilet: {
        get: GetToilet,
        create: CreateToilet,
        edit: EditToilet
    },
    vip: {
        get: GetVip,
        create: CreateVip,
        edit: EditVip
    }
};
