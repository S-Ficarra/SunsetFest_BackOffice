import React from "react";
import './profile.css'
import { decodeToken } from "react-jwt";
import { Link } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";


export function Profile () {

    const authHeader = useAuthHeader()
    const userId = decodeToken(authHeader)
    const { userLogged } = useUser(authHeader, userId.sub)

    return (
        <div className="MainContainer">
            <h1>VOTRE PROFIL</h1>
            <div className="ProfileContainer">
                <div className="InfoContainer">
                    <p><span>NOM : </span>{userLogged.name}</p>
                    <p><span>PRÉNOM : </span>{userLogged.firstName} {userLogged.name}</p>
                    <p><span>ADRESSE EMAIL : </span>{userLogged.email}</p>
                    <p><span>RÔLE : </span>{userLogged.role}</p>
                </div>
                {/*Allow only admin to have the option to add user*/}
                {userLogged.role === 'Administrateur' && (<div>
                    <Link to='/backoffice/utilisateurs/ajouter'><button className="CreateNewItemButton">AJOUTER UN UTILISATEUR</button></Link>
                </div>)}
            </div>
        </div>
    );
}
export default Profile;