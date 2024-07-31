import React, { useState, useEffect } from "react";
import './addLocation.css';
import { handleSubmitToilet, handleSubmitVip, handleSubmitStage, handleSubmitRestaurant, handleSubmitMerchandising, handleSubmitCamping, handleSubmitBar } from "./handleSubmit";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function AddLocation({ clickPosition }) {

    const authHeader = useAuthHeader()

    console.log(clickPosition);
    const [activeForm, setActiveForm] = useState(null);
    const [formValues, setFormValues] = useState({
        name: '',
        latitude: clickPosition.lat || '',
        longitude: clickPosition.lng || '',
        capacity: '',
        openingTime: '',
        closingTime: '',
        foodType: '',
        merchType: ''
    });

    console.log(formValues);


    useEffect(() => {
        setFormValues(prevValues => ({
            ...prevValues,
            latitude: clickPosition.lat,
            longitude: clickPosition.lng
        }));
    }, [clickPosition]);

    const handleButtonClick = (formName) => {
        setActiveForm(activeForm === formName ? null : formName);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    return (
        <div className="AllFormsContainer">

            <div className="FormSection">
                <div className="Button">
                    <button onClick={() => handleButtonClick('toilets')}><h2>TOILETTES</h2></button>
                </div>
                {activeForm === 'toilets' && (
                    <form onSubmit={(e) => {handleSubmitToilet(e, formValues, authHeader)}} className="ToiletForm">
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange}/>
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" id="latitude" name="latitude" value={formValues.latitude} onChange={handleChange}/>
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" id="longitude" name="longitude" value={formValues.longitude} onChange={handleChange}/>
                        <button className="SubmitButton">Enregistrer</button>
                    </form>
                )}
            </div>

            <div className="FormSection">
                <div className="Button">
                    <button onClick={() => handleButtonClick('camping')}><h2>CAMPING</h2></button>
                </div>
                {activeForm === 'camping' && (
                    <form onSubmit={(e) => {handleSubmitCamping(e, formValues, authHeader)}} className="CampingForm">
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange}/>
                        <label htmlFor="capacity">Capacité</label>
                        <input type="number" id="capacity" name="capacity" value={formValues.capacity} onChange={handleChange}/>
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" id="latitude" name="latitude" value={formValues.latitude} onChange={handleChange}/>
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" id="longitude" name="longitude" value={formValues.longitude} onChange={handleChange}/>
                        <button className="SubmitButton">Enregistrer</button>
                    </form>
                )}
            </div>

            <div className="FormSection">
                <div className="Button">
                    <button onClick={() => handleButtonClick('vip')}><h2>VIP</h2></button>
                </div>
                {activeForm === 'vip' && (
                    <form onSubmit={(e) => {handleSubmitVip(e, formValues, authHeader)}} className="VipForm">
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange}/>
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" id="latitude" name="latitude" value={formValues.latitude} onChange={handleChange}/>
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" id="longitude" name="longitude" value={formValues.longitude} onChange={handleChange}/>
                        <button className="SubmitButton">Enregistrer</button>
                    </form>
                )}
            </div>

            <div className="FormSection">
                <div className="Button">
                    <button onClick={() => handleButtonClick('stage')}><h2>SCÈNE</h2></button>
                </div>
                {activeForm === 'stage' && (
                    <form onSubmit={(e) => {handleSubmitStage(e, formValues, authHeader)}} className="StageForm">
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange}/>
                        <label htmlFor="capacity">Capacité</label>
                        <input type="number" id="capacity" name="capacity" value={formValues.capacity} onChange={handleChange}/>
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" id="latitude" name="latitude" value={formValues.latitude} onChange={handleChange}/>
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" id="longitude" name="longitude" value={formValues.longitude} onChange={handleChange}/>
                        <button className="SubmitButton">Enregistrer</button>
                    </form>
                )}
            </div>

            <div className="FormSection">
                <div className="Button">
                    <button onClick={() => handleButtonClick('bar')}><h2>BAR</h2></button>
                </div>
                {activeForm === 'bar' && (
                    <form onSubmit={(e) => {handleSubmitBar(e, formValues, authHeader)}} className="BarForm">
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange}/>
                        <label htmlFor="openingTime">Heure d'ouverture</label>
                        <input type="time" id="openingTime" name="openingTime" value={formValues.openingTime} onChange={handleChange}/>
                        <label htmlFor="closingTime">Heure de fermeture</label>
                        <input type="time" id="closingTime" name="closingTime" value={formValues.closingTime} onChange={handleChange}/>
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" id="latitude" name="latitude" value={formValues.latitude} onChange={handleChange}/>
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" id="longitude" name="longitude" value={formValues.longitude} onChange={handleChange}/>
                        <button className="SubmitButton">Enregistrer</button>
                    </form>
                )}
            </div>

            <div className="FormSection">
                <div className="Button">
                    <button onClick={() => handleButtonClick('restaurant')}><h2>RESTAURANT</h2></button>
                </div>
                {activeForm === 'restaurant' && (
                    <form onSubmit={(e) => {handleSubmitRestaurant(e, formValues, authHeader)}} className="RestaurantForm">
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange}/>
                        <label htmlFor="openingTime">Heure d'ouverture</label>
                        <input type="time" id="openingTime" name="openingTime" value={formValues.openingTime} onChange={handleChange}/>
                        <label htmlFor="closingTime">Heure de fermeture</label>
                        <input type="time" id="closingTime" name="closingTime" value={formValues.closingTime} onChange={handleChange}/>
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" id="latitude" name="latitude" value={formValues.latitude} onChange={handleChange}/>
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" id="longitude" name="longitude" value={formValues.longitude} onChange={handleChange}/>
                        <label htmlFor="foodType">Type de nourriture</label>
                        <input type="text" id="foodType" name="foodType" value={formValues.foodType} onChange={handleChange}/>
                        <button className="SubmitButton">Enregistrer</button>
                    </form>
                )}
            </div>

            <div className="FormSection">
                <div className="Button">
                    <button onClick={() => handleButtonClick('merch')}><h2>BOUTIQUE</h2></button>
                </div>
                {activeForm === 'merch' && (
                    <form onSubmit={(e) => {handleSubmitMerchandising(e, formValues, authHeader)}} className="MerchForm">
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange}/>
                        <label htmlFor="openingTime">Heure d'ouverture</label>
                        <input type="time" id="openingTime" name="openingTime" value={formValues.openingTime} onChange={handleChange}/>
                        <label htmlFor="closingTime">Heure de fermeture</label>
                        <input type="time" id="closingTime" name="closingTime" value={formValues.closingTime} onChange={handleChange}/>
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" id="latitude" name="latitude" value={formValues.latitude} onChange={handleChange}/>
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" id="longitude" name="longitude" value={formValues.longitude} onChange={handleChange}/>
                        <label htmlFor="merchType">Type de produits</label>
                        <input type="text" id="merchType" name="merchType" value={formValues.merchType} onChange={handleChange}/>
                        <button className="SubmitButton">Enregistrer</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AddLocation;
