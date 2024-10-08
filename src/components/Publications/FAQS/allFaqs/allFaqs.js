import React from "react";
import './allFaqs.css'
import { Link } from "react-router-dom";
import { decodeToken } from "react-jwt";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { DeleteFaq } from "../../../../controllers/Publications/faqs.controller";
import { useUser } from "../../../../hooks/useUser";
import { formatDate } from "../../../../services/utils";
import Pen from '../../../../assets/pen-solid.svg'
import Trash from '../../../../assets/trash-solid.svg'
import { useAllFaqs } from "../../../../hooks/Publications/useAllFaqs";


function AllFaqs () {

    const authHeader = useAuthHeader();
    const userId = decodeToken(authHeader)
    const { userLogged } = useUser(authHeader, userId.sub)
    const { allFaqs } = useAllFaqs(authHeader)


    const handleDelete = async (e, faqId) => {

        e.preventDefault();
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet FAQ ?");

        if (confirmation) {
            try {
                await DeleteFaq(authHeader, faqId);
                alert(`FAQ ${faqId} supprimé`);
                window.location.reload();
            } catch (error) {
                alert(`Erreur lors de la suppression de la FAQ : ${error.message}`);
            };
        };
    };

    if (allFaqs.length === 0) {
        return (
            <>
                <div className="CreateNewItemButtonContainer">
                    <Link to="/backoffice/faqs/ajouter"><button className="CreateNewItemButton">AJOUTER UNE NOUVELLE FAQ</button></Link>
                </div>
                <div className="EmptyTitle">
                    <h2>Il n'y a aucune FAQ pour le moment</h2>
                </div>
            </>
        )
    }
    
    return (
        <div className="AllFaqsContainer">
            <div className="CreateNewItemButtonContainer">
                <Link to="/backoffice/faqs/ajouter"><button className="CreateNewItemButton">AJOUTER UNE NOUVELLE FAQ</button></Link>
            </div>
            <div className="TitleContainerFaq">
                <h2>ID</h2>
                <h2>Question</h2>
                <h2>Réponse</h2>
                <h2>Status</h2>
                <h2>Auteur</h2>
                <h2>Créé le</h2>
                <h2>Modifié le</h2>
            </div>
            {allFaqs.map((faqs) => (
                <div className="FaqsContainer" key={faqs.id}>
                    <p>{faqs.id}</p>
                    <p>{faqs.question}</p>
                    <div id="Answer" dangerouslySetInnerHTML={{ __html: faqs.answer }}></div>
                    <p className={faqs.status ? "online" : "offline"}>{faqs.status ? "Publié" : "Non Publié"}</p>
                    <p>{faqs.userName}</p>
                    <p>{formatDate(faqs.createdAt)}</p>
                    <p>{formatDate(faqs.modifiedAt)}</p>
                    {/*Allow only admin & editor to have the option to delete and edit */}
                    {(userLogged.role === 'Administrateur' || userLogged.role === 'Editeur') && (
                            <div className="ActionContainerVertical">
                                <Link to={`/backoffice/faqs/${faqs.id}/editer`}>
                                    <button className="ActionButton">
                                        <div className="EditContainer">
                                                <img className="ActionButtonImg" src={Pen} alt="Modifier une FAQ" />
                                                <p className="ActionButtonP">Modifier</p>
                                        </div>
                                    </button>
                                </Link>
                                <button className="ActionButton" onClick={(e) => handleDelete(e, faqs.id)}>
                                    <div className="DeleteContainer">
                                        <img className="ActionButtonImg" src={Trash} alt="Supprimer une FAQ" />
                                        <p className="ActionButtonP">Supprimer</p>
                                    </div>
                                </button>
                            </div>
                        )}
                </div>
            ))};
        </div>
    );

};
export default AllFaqs;