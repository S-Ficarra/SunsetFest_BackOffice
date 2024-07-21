import React, {useState, useEffect} from "react";
import './allInformations.css'
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { decodeToken } from "react-jwt";
import { GetAllInformations, DeleteInformation } from "../../../../controllers/informations.controllers";
import { GetUser } from "../../../../controllers/user.controller";
import { convertToBase64, formatDate } from "../../../../services/utils";
import Pen from '../../../../assets/pen-solid.svg'
import Trash from '../../../../assets/trash-solid.svg'
import { all } from "axios";

function AllInformations () {

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

    const [allInformations, setAllInformations] = useState([]);
    useEffect(() => {
        const fetchAllInformations= async () => {
            try {
                const allInformations = await GetAllInformations(authHeader);
                setAllInformations(allInformations);
            } catch (error) {
                alert(error)
            }
        };

        fetchAllInformations();
    }, [authHeader]);

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


    return (
        <div>
            <div className="ButtonContainerAllFaq">
                <Link to="/backoffice/informations/ajouter"><button>AJOUTER UNE NOUVELLE INFORMATION</button></Link>
            </div>
            <div className="TitleContainer">
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
                <div className="informationContainer" key={information.id}>
                    <p>{information.id}</p>
                    <img src={convertToBase64(information.image)} alt="" />
                    <p>{information.title}</p>
                    <div id="text" dangerouslySetInnerHTML={{ __html: information.text }}></div>
                    <p className={information.status ? "online" : "offline"}>{information.status ? "Publié" : "Non Publié"}</p>
                    <p>{information.userName}</p>
                    <p>{formatDate(information.createdAt)}</p>
                    <p>{formatDate(information.modifiedAt)}</p>
                    {/*Allow only admin & editor to have the option to delete and edit */}
                    {(userLogged.role === 'Administrateur' || userLogged.role === 'Editeur') && (
                        <div className="ActionContainerFaq">
                            <Link to={`/backoffice/faqs/${information.id}/editer`}>
                                <button>
                                    <div className="EditContainer">
                                            <img src={Pen} alt="Modifier une Information" />
                                            <p>Modifier</p>
                                    </div>
                                </button>
                            </Link>
                            <button onClick={(e) => handleDelete(e, information.id)}>
                                <div className="DeleteContainer">
                                    <img src={Trash} alt="Supprimer une Information" />
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
export default AllInformations;