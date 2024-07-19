import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import React, {useState, useEffect} from "react";
import { GetAllUser, GetUser } from "../../controllers/user.controller";
import { decodeToken } from "react-jwt";
import './users.css'
import { Link } from "react-router-dom";
import Pen from '../../assets/pen-solid.svg'
import Trash from '../../assets/trash-solid.svg'
import { DeleteUser } from "../../controllers/user.controller";


function Users () {

    const authHeader = useAuthHeader();
    const userId = decodeToken(authHeader);

    const [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        const fetchAllUser = async () => {
            const allUsers = await GetAllUser(authHeader);
            setAllUsers(allUsers)
        };

        fetchAllUser();
      }, [authHeader]);


    const [userLogged, setUserLogged] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const user = await GetUser(authHeader, userId.sub);
            setUserLogged(user)
        };

        fetchUser();
      }, [authHeader, userId.sub]);
      

    const handleDelete = async (e, userId) => {

        e.preventDefault();
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");

        if (confirmation) {
            try {
                await DeleteUser(authHeader, userId);
                alert(`Utilisateur ${userId} supprimé`);
                window.location.reload();
            } catch (error) {
                alert(`Erreur lors de la suppression de l'utilisateur : ${error.message}`);
            };
        };
    };

    return (
        <div className="MainContainer">
            <h1>VOTRE ÉQUIPE</h1>
            <div className="UsersHeader">
                <div className="TitleContainer">
                    <h2 id="Name">Nom</h2>
                    <h2>Adresse Email</h2>
                    <h2>Rôle</h2>
                </div>
            </div>
            <div className="AllUsersContainer">
                {allUsers.map((user) => (
                    <div className="UserContainer" key={user.id}>
                        <p>{user.id}</p>
                        <p>{user.firstName} {user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.role}</p>
                        {userLogged.role === 'Administrateur' && (
                            <div className="ActionContainer">
                                <Link to={`/backoffice/utilisateurs/${user.id}/editer`}>
                                    <button>
                                        <div className="EditContainer">
                                                <img src={Pen} alt="Modifier un utilisateur" />
                                                <p>Modifier</p>
                                        </div>
                                    </button>
                                </Link>
                                <button onClick={(e) => handleDelete(e, user.id)}>
                                    <div className="DeleteContainer">
                                        <img src={Trash} alt="Supprimer un utilisateur" />
                                        <p>Supprimer</p>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Users;