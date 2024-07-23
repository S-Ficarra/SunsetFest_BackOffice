import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetUser, EditUser as Edit} from "../../../controllers/user.controller";
import { UserMapper } from "../../../mappers/user.mapper"; 
import { translator } from "../../../services/utils";
import { Link } from "react-router-dom";
import './editUser.css'

function EditUser ({ authHeader }) {
    
    const { id } = useParams();
    const [userEdited, setUserEdited] = useState();
    const [formState, setFormState] = useState({
        name: '',
        firstName: '',
        email: '',
        password: '',
        role: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            const user = await GetUser(authHeader, +id);
            const role = UserMapper.getRoleId(user.role)

            setFormState({
                name: user.name,
                firstName: user.firstName,
                email: user.email,
                password: '',
                role: role
            });
        };

        fetchUser();
      }, [authHeader, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let userEdited = await Edit(authHeader, formState, id);
            setUserEdited(userEdited);
        } catch (error) {
            const translatedMessage = translator(error.message);
            alert(translatedMessage); 
        };

    };


    if (userEdited) {
        return (
            <div className="SucessMessage">
                <h1>Utilisateur modifié avec succès!</h1>
                <p>Id : {userEdited.id}</p>
                <p>Nom : {userEdited.firstName} {userEdited.name}</p>
                <p>Email : {userEdited.email}</p>
                <p>Rôle : {userEdited.role}</p>
                <Link to='/backoffice/utilisateurs'><button>Retour au tableau de bord</button></Link>
            </div>
            );
    }

    return (
        <div className="AddUserContainer">
            <form onSubmit={handleSubmit}>
                <div className="InputContainer">
                    <label htmlFor="firstName">PRENOM :</label>
                    <input name='firstName' type="text" required defaultValue={formState.firstName} onChange={(e) => {handleChange(e)}}/>
                    <label htmlFor="name">NOM :</label>
                    <input name='name' type="text" required defaultValue={formState.name} onChange={(e) => {handleChange(e)}}/>
                    <label htmlFor="email">ADRESSE E-MAIL :</label>
                    <input name='email' type="email" required defaultValue={formState.email} onChange={(e) => {handleChange(e)}}/>
                    <label htmlFor="password">MOT DE PASSE : </label>
                    <input name='password' type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$" title='Votre mot de passe doit contenir minimum 8 caractères, au moins 1 chiffre, 1 majuscule, 1 minuscle et 1 caractère spécial' required onChange={(e) => {handleChange(e)}}/>
                    </div>
                    
                <div className="RoleContainer">
                    <label id="RoleLabel">ROLE :</label>
                    <div className="RadioContainer">
                        <div>
                            <input type="radio" id="Author" name="role" checked={formState.role === '1'} value="1" onChange={(e) => {handleChange(e)}}/>
                            <label htmlFor="Author">Auteur</label>
                        </div>
                        <div>
                            <input type="radio" id="Editor" name="role" checked={formState.role === '2'} value="2" onChange={(e) => {handleChange(e)}}/>
                            <label htmlFor="Editor">Éditeur</label>
                        </div>
                        <div>
                            <input type="radio" id="Administrator" name="role" checked={formState.role === '3'} value="3" onChange={(e) => {handleChange(e)}}/>
                            <label htmlFor="Administrator">Administrateur</label>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit">Modifier l'utilisateur</button>
                    <Link to='/backoffice/utilisateurs'><button>Annuler</button></Link>
                </div>
            </form>
        </div>
    );
};
export default EditUser;