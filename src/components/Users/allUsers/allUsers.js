import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import React from "react";
import { useUser } from "../../../hooks/useUser";
import { decodeToken } from "react-jwt";
import './allUsers.css'
import { Link } from "react-router-dom";
import Pen from '../../../assets/pen-solid.svg'
import Trash from '../../../assets/trash-solid.svg'
import { DeleteUser } from "../../../controllers/user.controller";
import { useAllUsers } from "../../../hooks/useAllUsers";


function AllUsers () {

    const authHeader = useAuthHeader();
    const userId = decodeToken(authHeader)

    const { userLogged } = useUser(authHeader, userId.sub)
    const { allUsers }= useAllUsers(authHeader)
      

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
                    <h2>ID</h2>
                    <h2>Nom</h2>
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
                        {/*Allow only admin to have the option to delete and edit user*/}
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
export default AllUsers;