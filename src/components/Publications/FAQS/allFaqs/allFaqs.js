import React, { useState, useEffect }from "react";
import './allFaqs.css'
import { Link } from "react-router-dom";
import { decodeToken } from "react-jwt";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { GetAllFaqs, DeleteFaq } from "../../../../controllers/faqs.controllers";
import { GetUser } from "../../../../controllers/user.controller";
import { formatDate } from "../../../../services/utils";
import Pen from '../../../../assets/pen-solid.svg'
import Trash from '../../../../assets/trash-solid.svg'


function AllFaqs () {

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


    const [allFaqs, setAllFaqs] = useState([]);
    useEffect(() => {
        const fetchAllFaqs = async () => {
            const allFaqs = await GetAllFaqs(authHeader);
            setAllFaqs(allFaqs);
        };

        fetchAllFaqs();
    }, [authHeader]);

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

    
    return (
        <div className="AllFaqsContainer">
            <div className="ButtonContainerAllFaq">
                <Link to="/backoffice/faqs/ajouter"><button>AJOUTER UNE NOUVELLE FAQ</button></Link>
            </div>
            <div className="TitleContainer">
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
                            <div className="ActionContainerFaq">
                                <Link to={`/backoffice/faqs/${faqs.id}/editer`}>
                                    <button>
                                        <div className="EditContainer">
                                                <img src={Pen} alt="Modifier une FAQ" />
                                                <p>Modifier</p>
                                        </div>
                                    </button>
                                </Link>
                                <button onClick={(e) => handleDelete(e, faqs.id)}>
                                    <div className="DeleteContainer">
                                        <img src={Trash} alt="Supprimer une FAQ" />
                                        <p>Supprimer</p>
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