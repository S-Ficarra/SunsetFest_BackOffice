import React, { useState, useEffect } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { GetCountdown, EditCountdown as Edit } from "../../../controllers/countdown.controller";
import { Link, useParams } from "react-router-dom";
import { formatDate, getFullDateCountdown, getTime } from "../../../services/utils";

function EditCountdown () {

    const { id } = useParams()
    const authHeader = useAuthHeader();
    const [countdownEdited, setCountdownEdited] = useState()
    const [formState, setFormState] = useState({
        name: '',
        date: '',
        time: ''
    });


    useEffect(() => {
        const fetchCountdowns = async () => {
            try {
                const countdown = await GetCountdown(authHeader, id);

                setFormState({
                    name: countdown.name,
                    date: getFullDateCountdown(countdown.endingDateAndTime),
                    time: getTime(countdown.endingDateAndTime)
                });
            } catch (error) {
                console.log(error)
            }
        };

        fetchCountdowns();
    }, [authHeader, id]);

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
            let countdownEdited = await Edit(authHeader, formState, id);
            setCountdownEdited(countdownEdited);
        } catch (error) {
            alert(error.message); 
        };

    };

    if (countdownEdited) {
        return (
            <div className="SucessMessage">
                <h1>Countdown créé avec succès!</h1>
                <p><span>ID :</span> {countdownEdited.id}</p>
                <p><span>Nom :</span> {countdownEdited.name}</p>
                <p><span>Date de fin :</span> {formatDate(countdownEdited.endingDateAndTime)}</p>
                <Link to='/backoffice/countdown'><button>Retour aux countdowns</button></Link>
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
                    <input type="text" id="name" name="name" placeholder="Nom" required onChange={(e) => {handleChange(e)}} defaultValue={formState.name}/>
                </div>
                <div className="DateInputContainer">
                    <div className="InputContainer">
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" id="date" required onChange={(e) => {handleChange(e)}} value={formState.date}/>
                    </div>
                    <div className="InputContainer">
                        <label htmlFor="time">Heure</label>
                        <input type="time" name="time" id="time" required onChange={(e) => {handleChange(e)}} value={formState.time}/>
                    </div>
                </div>
                <div className="AddPerformanceButton">
                    <button>Enregistrer</button>
                    <Link to='/backoffice/countdown'><button>Annuler</button></Link>
                </div>
            </form>
        </div>
    );

};
export default EditCountdown;