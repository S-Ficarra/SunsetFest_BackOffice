import React, { useState } from "react";
import './addCountdown.css'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CreateCountdown } from "../../../controllers/countdown.controller";
import { Link } from "react-router-dom";
import { formatDate } from "../../../services/utils";

function AddCountdown () {

    const authHeader = useAuthHeader();
    const [countdownCreated, setCountdownCreated] = useState()
    const [formState, setFormState] = useState({
        name: 'null',
        date: 'null',
        time: 'null'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let countdownCreated = await CreateCountdown(authHeader, formState);
            setCountdownCreated(countdownCreated);
        } catch (error) {
            alert(error.message); 
        };

    };

    const handleResetForm = () => {
        setCountdownCreated('');
    };

    if (countdownCreated) {
        return (
            <div className="SucessMessage">
                <h1>Countdown créé avec succès!</h1>
                <p><span>ID :</span> {countdownCreated.id}</p>
                <p><span>Nom :</span> {countdownCreated.name}</p>
                <p><span>Date de fin :</span> {formatDate(countdownCreated.endingDateAndTime)}</p>
                <Link to='/backoffice/countdown'><button>Retour aux countdowns</button></Link>
                <button onClick={handleResetForm}>Ajouter un nouveau countdown</button>
            </div>
        );
    };

    return (
        <div className="MainContainerAddCountdown">
            <div className="HeadTitleContainer">
                <h1>Ajouter un compte à rebours</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="NameInputContainer">
                    <input type="text" id="name" name="name" placeholder="Nom" required onChange={(e) => {handleChange(e)}}/>
                </div>
                <div className="DateInputContainer">
                    <div className="InputContainer">
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" id="date" required onChange={(e) => {handleChange(e)}}/>
                    </div>
                    <div className="InputContainer">
                        <label htmlFor="time">Heure</label>
                        <input type="time" name="time" id="time" required onChange={(e) => {handleChange(e)}}/>
                    </div>
                </div>
                <div className="AddPerformanceButton">
                    <button type="submit">Enregistrer</button>
                    <Link to='/backoffice/countdown' ><button>Annuler</button></Link>
                </div>
            </form>
        </div>
    );

};
export default AddCountdown;