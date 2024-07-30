import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './allCountdowns.css'
import { GetAllCountdowns, DeleteCountdown } from "../../../controllers/countdown.controller";
import { GetUser } from "../../../controllers/user.controller";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { decodeToken } from "react-jwt";
import { formatDate } from "../../../services/utils";
import Pen from '../../../assets/pen-solid.svg'
import Trash from '../../../assets/trash-solid.svg'



function AllCountdowns () {

    const authHeader = useAuthHeader();
    const userId = decodeToken(authHeader);

    const [userLogged, setUserLogged] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const user = await GetUser(authHeader, userId.sub);
            setUserLogged(user)
        };

        fetchUser();
      }, [authHeader, userId.sub]);

    const [allCountdowns, setAllCountdowns] = useState([]);
    useEffect(() => {
        const fetchAllCountdowns = async () => {
            try {
                const allCountdowns = await GetAllCountdowns(authHeader);
                setAllCountdowns(allCountdowns);
            } catch (error) {
                console.log(error)
            }
        };

        fetchAllCountdowns();
    }, [authHeader]);

    const handleDelete = async (e, countdownId) => {

        e.preventDefault();
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce countdown?");

        if (confirmation) {
            try {
                await DeleteCountdown(authHeader, countdownId);
                alert(`Countdown ${countdownId} supprimé`);
                window.location.reload();
            } catch (error) {
                alert(`Erreur lors de la suppression du countdown : ${error.message}`);
            };
        };
    };


    if (allCountdowns.length === 0) {
        return (
            <>
                <div className="EmptyTitle">
                    <h2>Il n'y a aucun compte à rebours pour le moment</h2>
                </div>
            </>
        )
    }

    return (
        <div className="AllCountdownContainer">
            <div className="ButtonContainerAllFaq">
                <Link to="/backoffice/countdown/ajouter"><button>AJOUTER UN NOUVEAU COUNTDOWN</button></Link>
            </div>
            <div className="TitleContainerCountdown">
                <h2>ID</h2>
                <h2>Nom</h2>
                <h2>Date de fin</h2>
            </div>
            {allCountdowns.map((countdown) => (
                <div className="CountdownContainer" key={countdown.id}>
                    <p>{countdown.id}</p>
                    <p>{countdown.name}</p>
                    <p>{formatDate(countdown.endingDateAndTime)}</p>
                    {/*Allow only admin & editor to have the option to delete and edit */}
                    {(userLogged.role === 'Administrateur' || userLogged.role === 'Editeur') && (
                            <div className="ActionContainerFaq">
                                <Link to={`/backoffice/countdown/${countdown.id}/editer`}>
                                    <button>
                                        <div className="EditContainer">
                                                <img src={Pen} alt="Modifier un countdown" />
                                                <p>Modifier</p>
                                        </div>
                                    </button>
                                </Link>
                                <button onClick={(e) => handleDelete(e, countdown.id)}>
                                    <div className="DeleteContainer">
                                        <img src={Trash} alt="Supprimer un countdown" />
                                        <p>Supprimer</p>
                                    </div>
                                </button>
                            </div>
                    )}
                </div>
            ))}
        </div>
    );

};
export default AllCountdowns;