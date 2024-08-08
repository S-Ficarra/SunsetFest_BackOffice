import React from "react";
import { Link } from "react-router-dom";
import './allCountdowns.css'
import { DeleteCountdown } from "../../../controllers/countdown.controller";
import { useAllCountdowns } from "../../../hooks/useAllCountdowns";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { decodeToken } from "react-jwt";
import { formatDate } from "../../../services/utils";
import Pen from '../../../assets/pen-solid.svg'
import Trash from '../../../assets/trash-solid.svg'
import { useUser } from "../../../hooks/useUser";



function AllCountdowns () {

    const authHeader = useAuthHeader();
    const userId = decodeToken(authHeader);

    const { userLogged } = useUser(authHeader, userId.sub)
    const { allCountdowns } = useAllCountdowns(authHeader)

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
            <div className="CreateNewItemButtonContainer">
                <Link to="/backoffice/countdown/ajouter"><button className="CreateNewItemButton">AJOUTER UN NOUVEAU COUNTDOWN</button></Link>
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
                            <div className="ActionContainerHorizontal">
                                <Link to={`/backoffice/countdown/${countdown.id}/editer`}>
                                    <button className="ActionButton">
                                        <div className="EditContainer">
                                                <img className="ActionButtonImg"src={Pen} alt="Modifier un countdown" />
                                                <p className="ActionButtonP">Modifier</p>
                                        </div>
                                    </button>
                                </Link>
                                <button className="ActionButton" onClick={(e) => handleDelete(e, countdown.id)}>
                                    <div className="DeleteContainer">
                                        <img className="ActionButtonImg" src={Trash} alt="Supprimer un countdown" />
                                        <p className="ActionButtonP">Supprimer</p>
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