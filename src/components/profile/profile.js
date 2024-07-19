import React, {useState, useEffect} from "react";
import './profile.css'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { GetUser } from "../../controllers/user.controller";
import { decodeToken } from "react-jwt";
import { Link } from "react-router-dom";

export function Profile () {

    const authHeader = useAuthHeader()
    const userId = decodeToken(authHeader)
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const user = await GetUser(authHeader, userId.sub);
            setUser(user)
        };

        fetchUser();
      }, [authHeader, userId.sub]);

    return (
        <div className="MainContainer">
            <h1>Votre Profil</h1>
            <div className="ProfileContainer">
                <div className="InfoContainer">
                    <p><span>NOM : </span> {user.name}</p>
                    <p><span>PRÉNOM : </span> {user.firstName}</p>
                    <p><span>ADRESSE EMAIL : </span> {user.email}</p>
                    <p><span>RÔLE : </span> {user.role} </p>
                </div>
                {user.role === 'Administrateur' && (<div className="AddUserButtonContainer">
                    <Link to='/backoffice/utilisateurs/ajouter'><button>AJOUTER UN UTILISATEUR</button></Link>
                </div>)}
            </div>
        </div>
    );
}
export default Profile;