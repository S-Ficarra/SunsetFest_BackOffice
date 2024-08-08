import React from "react";
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { decodeToken } from "react-jwt";
import { DeleteNews } from "../../../../controllers/Publications/news.controller";
import { useUser } from "../../../../hooks/useUser";
import { formatDate } from "../../../../services/utils";
import Pen from '../../../../assets/pen-solid.svg'
import Trash from '../../../../assets/trash-solid.svg'
import { convertToBase64 } from "../../../../services/utils";
import { useAllNews } from "../../../../hooks/Publications/useAllNews";

function AllNews () {

    const authHeader = useAuthHeader();
    const userId = decodeToken(authHeader)
    
    const { userLogged } = useUser(authHeader, userId.sub)
    const { allNews }= useAllNews(authHeader)

    const handleDelete = async (e, newsId) => {

        e.preventDefault();
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet Actualité ?");

        if (confirmation) {
            try {
                await DeleteNews(authHeader, newsId);
                alert(`Actualité ${newsId} supprimé`);
                window.location.reload();
            } catch (error) {
                alert(`Erreur lors de la suppression de l'actualité : ${error.message}`);
            };
        };
    };

    if (allNews.length === 0) {
        return (
            <>
                <div className="CreateNewItemButtonContainer">
                    <Link to="/backoffice/actualites/ajouter"><button className="CreateNewItemButton">AJOUTER UNE NOUVELLE ACTUALITÉ</button></Link>
                </div>
                <div className="EmptyTitle">
                    <h2>Il n'y a aucune Actualité pour le moment</h2>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="CreateNewItemButtonContainer">
                <Link to="/backoffice/actualites/ajouter"><button className="CreateNewItemButton">AJOUTER UNE NOUVELLE ACTUALITÉ</button></Link>
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
            {allNews.map((news) => (
                <div className="IllustratedContainer" key={news.id}>
                    <p>{news.id}</p>
                    <img className="IllustratedContainerImg" src={convertToBase64(news.image)} alt={news.title} />
                    <p>{news.title}</p>
                    <div id="textDisplay" dangerouslySetInnerHTML={{ __html: news.text }}></div>
                    <p className={news.status ? "online" : "offline"}>{news.status ? "Publié" : "Non Publié"}</p>
                    <p>{news.userName}</p>
                    <p>{formatDate(news.createdAt)}</p>
                    <p>{formatDate(news.modifiedAt)}</p>
                    {/*Allow only admin & editor to have the option to delete and edit */}
                    {(userLogged.role === 'Administrateur' || userLogged.role === 'Editeur') && (
                        <div className="ActionContainerVertical">
                            <Link to={`/backoffice/actualites/${news.id}/editer`}>
                                <button className="ActionButton">
                                    <div className="EditContainer">
                                            <img className="ActionButtonImg" src={Pen} alt="Modifier une Information" />
                                            <p className="ActionButtonP" >Modifier</p>
                                    </div>
                                </button>
                            </Link>
                            <button className="ActionButton" onClick={(e) => handleDelete(e, news.id)}>
                                <div className="DeleteContainer">
                                    <img className="ActionButtonImg" src={Trash} alt="Supprimer une Information" />
                                    <p className="ActionButtonP" >Supprimer</p>
                                </div>
                            </button>
                        </div>
                    )}
                </div>

            ))}
        </div>
    );

};
export default AllNews;