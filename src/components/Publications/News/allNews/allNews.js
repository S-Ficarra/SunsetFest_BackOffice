import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { decodeToken } from "react-jwt";
import { GetAllNews, DeleteNews } from "../../../../controllers/news.controller";
import { GetUser } from "../../../../controllers/user.controller";
import { formatDate } from "../../../../services/utils";
import Pen from '../../../../assets/pen-solid.svg'
import Trash from '../../../../assets/trash-solid.svg'
import { convertToBase64 } from "../../../../services/utils";

function AllNews () {

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


    const [allNews, setAllNews] = useState([]);
    useEffect(() => {
        const fetchAllNews= async () => {
            try {
                const allNews = await GetAllNews(authHeader);
                setAllNews(allNews);
            } catch (error) {
                console.log(error)
            }
        };

        fetchAllNews();
    }, [authHeader]);

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
                <div className="ButtonContainerAllFaq">
                    <Link to="/backoffice/actualites/ajouter"><button>AJOUTER UNE NOUVELLE ACTUALITÉ</button></Link>
                </div>
                <div className="EmptyTitle">
                    <h2>Il n'y a aucune Actualité pour le moment</h2>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="ButtonContainerAllFaq">
                <Link to="/backoffice/actualites/ajouter"><button>AJOUTER UNE NOUVELLE ACTUALITÉ</button></Link>
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
            {allNews.map((news) => (
                <div className="informationContainer" key={news.id}>
                    <p>{news.id}</p>
                    <img src={convertToBase64(news.image)} alt={news.title} />
                    <p>{news.title}</p>
                    <div id="text" dangerouslySetInnerHTML={{ __html: news.text }}></div>
                    <p className={news.status ? "online" : "offline"}>{news.status ? "Publié" : "Non Publié"}</p>
                    <p>{news.userName}</p>
                    <p>{formatDate(news.createdAt)}</p>
                    <p>{formatDate(news.modifiedAt)}</p>
                    {/*Allow only admin & editor to have the option to delete and edit */}
                    {(userLogged.role === 'Administrateur' || userLogged.role === 'Editeur') && (
                        <div className="ActionContainerFaq">
                            <Link to={`/backoffice/actualites/${news.id}/editer`}>
                                <button>
                                    <div className="EditContainer">
                                            <img src={Pen} alt="Modifier une Information" />
                                            <p>Modifier</p>
                                    </div>
                                </button>
                            </Link>
                            <button onClick={(e) => handleDelete(e, news.id)}>
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
export default AllNews;