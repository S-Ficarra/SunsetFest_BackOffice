import React from "react";
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { decodeToken } from "react-jwt";
import { DeleteInformation } from "../../../../controllers/Publications/informations.controller";
import { useUser } from "../../../../hooks/useUser";
import { formatDate } from "../../../../services/utils";
import Pen from '../../../../assets/pen-solid.svg'
import Trash from '../../../../assets/trash-solid.svg'
import { useAllInformations } from "../../../../hooks/Publications/useAllInformations";
import { BASE_URL } from "../../../../App";

function AllInformations () {

    const authHeader = useAuthHeader();
    const userId = decodeToken(authHeader)
    
    const { userLogged } = useUser(authHeader, userId.sub)
    const { allInformations } = useAllInformations(authHeader)


    const handleDelete = async (e, informationId) => {

        e.preventDefault();
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet Information ?");

        if (confirmation) {
            try {
                await DeleteInformation(authHeader, informationId);
                alert(`Information ${informationId} supprimé`);
                window.location.reload();
            } catch (error) {
                alert(`Erreur lors de la suppression de l'information : ${error.message}`);
            };
        };
    };

    if (allInformations.length === 0) {
        return (
            <>
                <div className="CreateNewItemButtonContainer">
                    <Link to="/backoffice/informations/ajouter"><button className="CreateNewItemButton">AJOUTER UNE NOUVELLE INFORMATION</button></Link>
                </div>
                <div className="EmptyTitle">
                    <h2>Il n'y a aucune Information pour le moment</h2>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="CreateNewItemButtonContainer">
                <Link to="/backoffice/informations/ajouter"><button className="CreateNewItemButton">AJOUTER UNE NOUVELLE INFORMATION</button></Link>
            </div>
            <div className="TitleContainerIllustrated">
                <h2>ID</h2>
                <h2>Image</h2>
                <h2>Titre</h2>
                <h2>Texte</h2>
                <h2>Statut</h2>
                <h2>Auteur</h2>
                <h2>Créé le</h2>
                <h2>Modifié le</h2>
            </div>
            {allInformations.map((information) => (
                <div className="IllustratedContainer" key={information.id}>
                    <p>{information.id}</p>
                    <img className="IllustratedContainerImg" src={`${BASE_URL}${information.image}`} alt={information.title} />
                    <p>{information.title}</p>
                    <div id="textDisplay" dangerouslySetInnerHTML={{ __html: information.text }}></div>
                    <p className={information.status ? "online" : "offline"}>{information.status ? "Publié" : "Non Publié"}</p>
                    <p>{information.userName}</p>
                    <p>{formatDate(information.createdAt)}</p>
                    <p>{formatDate(information.modifiedAt)}</p>
                    {/*Allow only admin & editor to have the option to delete and edit */}
                    {(userLogged.role === 'Administrateur' || userLogged.role === 'Editeur') && (
                        <div className="ActionContainerVertical">
                            <Link to={`/backoffice/informations/${information.id}/editer`}>
                                <button className="ActionButton">
                                    <div className="EditContainer">
                                            <img className="ActionButtonImg" src={Pen} alt="Modifier une Information" />
                                            <p className="ActionButtonP">Modifier</p>
                                    </div>
                                </button>
                            </Link>
                            <button className="ActionButton" onClick={(e) => handleDelete(e, information.id)}>
                                <div className="DeleteContainer">
                                    <img className="ActionButtonImg" src={Trash} alt="Supprimer une Information" />
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
export default AllInformations;