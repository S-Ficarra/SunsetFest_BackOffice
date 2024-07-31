import { CreateToilet } from "../../../controllers/Facilities/toilet.controller";
import { CreateVip } from "../../../controllers/Facilities/vip.controller";
import { CreateCamping } from "../../../controllers/Facilities/camping.controller";
import { CreateStage } from "../../../controllers/Facilities/stages.controller";
import { CreateRestaurant } from "../../../controllers/Facilities/restaurant.controller";
import { CreateMerchandising } from "../../../controllers/Facilities/merchandising.controller";
import { CreateBar } from "../../../controllers/Facilities/bar.controller";

export const handleSubmitToilet = async (e, formValues, authHeader) => {
    e.preventDefault();
    
    try {
        await CreateToilet(authHeader, formValues);
        alert(`Toilettes ${formValues.name} créé!`);
        window.location.reload();
    } catch (error) {
        alert(error.message); 
    }
};

export const handleSubmitVip = async (e, formValues, authHeader) => {
    e.preventDefault();
    
    try {
        await CreateVip(authHeader, formValues);
        alert(`Vip ${formValues.name} créé!`);
        window.location.reload();
    } catch (error) {
        alert(error.message); 
    }
};

export const handleSubmitStage = async (e, formValues, authHeader) => {
    e.preventDefault();
    
    try {
        await CreateStage(authHeader, formValues);
        alert(`Scène ${formValues.name} créée!`);
        window.location.reload();
    } catch (error) {
        alert(error.message); 
    }
};

export const handleSubmitCamping = async (e, formValues, authHeader) => {
    e.preventDefault();
    
    try {
        await CreateCamping(authHeader, formValues);
        alert(`Camping ${formValues.name} créé!`);
        window.location.reload();
    } catch (error) {
        alert(error.message); 
    }
};

export const handleSubmitRestaurant = async (e, formValues, authHeader) => {
    e.preventDefault();

    formValues.openingTime = `1970-01-01T${formValues.openingTime}`;
    formValues.closingTime = `1970-01-01T${formValues.closingTime}`;
    
    try {
        await CreateRestaurant(authHeader, formValues);
        alert(`Restaurant ${formValues.name} créé!`);
        window.location.reload();
    } catch (error) {
        alert(error.message); 
    }
};

export const handleSubmitMerchandising = async (e, formValues, authHeader) => {
    e.preventDefault();

    formValues.openingTime = `1970-01-01T${formValues.openingTime}`;
    formValues.closingTime = `1970-01-01T${formValues.closingTime}`;
    
    try {
        await CreateMerchandising(authHeader, formValues);
        alert(`Boutique ${formValues.name} créée!`);
        window.location.reload();
    } catch (error) {
        alert(error.message); 
    }
};

export const handleSubmitBar = async (e, formValues, authHeader) => {
    e.preventDefault();

    formValues.openingTime = `1970-01-01T${formValues.openingTime}`;
    formValues.closingTime = `1970-01-01T${formValues.closingTime}`;
    
    try {
        await CreateBar(authHeader, formValues);
        alert(`Bar ${formValues.name} créée!`);
        window.location.reload();
    } catch (error) {
        alert(error.message); 
    }
};