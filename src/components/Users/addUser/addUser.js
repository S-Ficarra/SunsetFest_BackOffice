import React, { useState } from "react";
import './addUser.css'
import { Link } from "react-router-dom";
import { translator } from "../../../services/utils";
import { CreateUser } from "../../../controllers/user.controller";

function AddUser ({authHeader}) {

    const [userCreated, setUserCreated] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const name = formData.get('name');
        const firstName = formData.get('firstName');
        const email = formData.get('email')
        const password = formData.get('password');
        const role = formData.get('role');

        try {
            let userCreated = await CreateUser(authHeader, name, firstName, email, password, role);
            setUserCreated(userCreated);
        } catch (error) {
            const translatedMessage = translator(error.message);
            alert(translatedMessage); 
        };
    }; 

    const handleResetForm = () => {
        setUserCreated(null);
    };

    if (userCreated) {
        return (
            <div className="SucessMessage">
                <h1>Utilisateur créé avec succès!</h1>
                <p><span>Id :</span> {userCreated.id}</p>
                <p><span>Nom :</span> {userCreated.firstName} {userCreated.name} </p>
                <p><span>Email :</span> {userCreated.email}</p>
                <p><span>Rôle :</span> {userCreated.role}</p>
                <Link to='/backoffice/utilisateurs'><button>Retour au tableau de bord</button></Link>
                <button onClick={handleResetForm}>Ajouter un nouvel utilisateur</button>
            </div>
        );
    };

    return (
        <div className="AddUserContainer">
            <form onSubmit={handleSubmit}>
                <div className="InputContainer">
                    <label htmlFor="firstName">PRENOM :</label>
                    <input id="firstName" name='firstName' type="text" required/>
                    <label htmlFor="name">NOM :</label>
                    <input id="name" name='name' type="text" required/>
                    <label htmlFor="email">ADRESSE E-MAIL :</label>
                    <input id="email" name='email' type="email" required/>
                    <label htmlFor="password">MOT DE PASSE : </label>
                    <input id="password" name='password' type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$" title='Votre mot de passe doit contenir minimum 8 caractères, au moins 1 chiffre, 1 majuscule, 1 minuscle et 1 caractère spécial' required/>
                    </div>
                    
                <div className="RoleContainer">
                    <label id="RoleLabel">ROLE :</label>
                    <div className="RadioContainer">
                        <div>
                            <input type="radio" defaultChecked id="Author" name="role" value="1" />
                            <label htmlFor="Author">Auteur</label>
                        </div>
                        <div>
                            <input type="radio" id="Editor" name="role" value="2" />
                            <label htmlFor="Editor">Éditeur</label>
                        </div>
                        <div>
                            <input type="radio" id="Administrator" name="role" value="3" />
                            <label htmlFor="Administrator">Administrateur</label>
                        </div>
                    </div>
                </div>
                <div className="ValidateFormButtonContainer">
                    <button type="submit" className="ValidateFormButton">Enregistrer</button>
                    <Link to='/backoffice/utilisateurs'><button className="ValidateFormButton">Annuler</button></Link>
                </div>
            </form>
        </div>
        );
};
export default AddUser;