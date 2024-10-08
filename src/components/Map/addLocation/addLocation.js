import React, { useState, useEffect } from "react";
import './addLocation.css';
import { controllers } from "../controllers";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function AddLocation({ clickPosition }) {

    const authHeader = useAuthHeader()

    const [controller, setController] = useState(null);
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


    useEffect(() => {
        setFormValues(prevValues => ({
            ...prevValues,
            latitude: clickPosition.lat,
            longitude: clickPosition.lng
        }));
    }, [clickPosition]);


    const handleButtonClick = (formName) => {
        setActiveForm(activeForm === formName ? null : formName);
        setController(controllers[formName]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        formValues.openingTime = `1970-01-01T${formValues.openingTime}`;
        formValues.closingTime = `1970-01-01T${formValues.closingTime}`;

        await controller.create(authHeader, formValues);
        alert(`${formValues.name} créé!`);
        window.location.reload()
    };

    return (
        <div className="AllFormsContainer">

            <div className="FormSection">
                <div className="Button">
                    <button onClick={() => handleButtonClick('bar')}><h2>BAR</h2></button>
                </div>
                {activeForm === 'bar' && (
                    <form onSubmit={handleSubmit} className="BarForm">
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
                    <button onClick={() => handleButtonClick('camping')}><h2>CAMPING</h2></button>
                </div>
                {activeForm === 'camping' && (
                    <form onSubmit={handleSubmit} className="CampingForm">
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
                    <button onClick={() => handleButtonClick('merch')}><h2>BOUTIQUE</h2></button>
                </div>
                {activeForm === 'merch' && (
                    <form onSubmit={handleSubmit} className="MerchForm">
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

            <div className="FormSection">
                <div className="Button">
                    <button onClick={() => handleButtonClick('restaurant')}><h2>RESTAURANT</h2></button>
                </div>
                {activeForm === 'restaurant' && (
                    <form onSubmit={handleSubmit} className="RestaurantForm">
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
                    <button onClick={() => handleButtonClick('stage')}><h2>SCÈNE</h2></button>
                </div>
                {activeForm === 'stage' && (
                    <form onSubmit={handleSubmit} className="StageForm">
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
                    <button onClick={() => handleButtonClick('toilet')}><h2>TOILETTES</h2></button>
                </div>
                {activeForm === 'toilet' && (
                    <form onSubmit={handleSubmit} className="ToiletForm">
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
                    <button onClick={() => handleButtonClick('vip')}><h2>VIP</h2></button>
                </div>
                {activeForm === 'vip' && (
                    <form onSubmit={handleSubmit} className="VipForm">
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

        </div>
    );
}

export default AddLocation;
