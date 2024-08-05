import React, {useEffect, useState} from "react";
import { controllers } from "../controllers";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function EditLocation ({clickPosition, locationToEdit, handleEditLocation}) {

    const [data, setData] = useState(null);
    const [controller, setController] = useState(null);
    const authHeader = useAuthHeader()
    const [formValues, setFormValues] = useState({
        name: '',
        latitude: '',
        longitude: '',
        capacity: '',
        openingTime: '',
        closingTime: '',
        foodType: '',
        merchType: ''
    });  


    //hook to fill the form with existing data once the component is mounted
    useEffect(() => {
        const fetchData = async () => {
            const controller = controllers[locationToEdit.type];
            setController(controller);
            const fetchedData = await controller.get(locationToEdit.id);
            setData(fetchedData);

            setFormValues({
                //fetchData used and not data as component mounted with data empty, using it here avoid to have another useEffect
                name: fetchedData.name || '',
                latitude: fetchedData.location.lat || '',
                longitude: fetchedData.location.lng || '',
                capacity: fetchedData.capacity || '',
                openingTime: fetchedData.openingHour ? fetchedData.openingHour.replace('h', ':') : '',
                closingTime: fetchedData.openingHour ? fetchedData.closingHour.replace('h', ':') : '',
                foodType: fetchedData.foodType || '',
                merchType: fetchedData.merchType || ''
            });
        };

        fetchData();
    }, [locationToEdit.id, locationToEdit.type]);

    //hook to show the add/edit location marker at each click
    useEffect(() => {
        setFormValues(prevValues => ({
            ...prevValues,
            latitude: clickPosition.lat,
            longitude: clickPosition.lng
        }));
    }, [clickPosition]);


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

        await controller.edit(authHeader, locationToEdit.id, formValues);
        alert(`${formValues.name} modifié!`);
        handleEditLocation();
        window.location.reload()
    };

  
    return (
        <div className="AllFormsContainer">
            <div className="FormSection">
                <div className="Button">
                    <h2>{locationToEdit.type.toUpperCase()}</h2>
                </div>
                {locationToEdit.type === 'bar' && (
                    <form className="BarForm" onSubmit={handleSubmit}>
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange} />
                        <label htmlFor="openingTime">Heure d'ouverture</label>
                        <input type="time" id="openingTime" name="openingTime" value={formValues.openingTime} onChange={handleChange} />
                        <label htmlFor="closingTime">Heure de fermeture</label>
                        <input type="time" id="closingTime" name="closingTime" value={formValues.closingTime} onChange={handleChange} />
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" id="latitude" name="latitude" value={formValues.latitude} onChange={handleChange} />
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" id="longitude" name="longitude" value={formValues.longitude} onChange={handleChange} />
                        <button className="SubmitButton" type="submit">Enregistrer</button>
                        <button className="SubmitButton" type="button" onClick={handleEditLocation}>Annuler</button>
                    </form>
                )}
                {locationToEdit.type === 'camping' && (
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
                        <button className="SubmitButton" type="button" onClick={handleEditLocation}>Annuler</button>
                    </form>
                )}
                {locationToEdit.type === 'merchandising' && (
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
                        <button className="SubmitButton" type="button" onClick={handleEditLocation}>Annuler</button>
                    </form>
                )}
                {locationToEdit.type === 'restaurant' && (
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
                        <button className="SubmitButton" type="button" onClick={handleEditLocation}>Annuler</button>
                    </form>
                )}
                {locationToEdit.type === 'stage' && (
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
                        <button className="SubmitButton" type="button" onClick={handleEditLocation}>Annuler</button>
                    </form>
                )}
                {locationToEdit.type === 'toilet' && (
                    <form onSubmit={handleSubmit} className="ToiletForm">
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange}/>
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" id="latitude" name="latitude" value={formValues.latitude} onChange={handleChange}/>
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" id="longitude" name="longitude" value={formValues.longitude} onChange={handleChange}/>
                        <button className="SubmitButton">Enregistrer</button>
                        <button className="SubmitButton" type="button" onClick={handleEditLocation}>Annuler</button>
                    </form>
                )}
                {locationToEdit.type === 'vip' && (
                    <form onSubmit={handleSubmit} className="VipForm">
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange}/>
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" id="latitude" name="latitude" value={formValues.latitude} onChange={handleChange}/>
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" id="longitude" name="longitude" value={formValues.longitude} onChange={handleChange}/>
                        <button className="SubmitButton">Enregistrer</button>
                        <button className="SubmitButton" type="button" onClick={handleEditLocation}>Annuler</button>
                    </form>
                )}
            </div>
        </div>
    );

};
export default EditLocation;