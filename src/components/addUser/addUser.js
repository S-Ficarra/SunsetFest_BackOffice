import React, { useState } from "react";
import './addUser.css'
import { CreateUser } from "../../controllers/user.controller";

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

        let userCreated = await CreateUser(authHeader, name, firstName, email, password, role)

        if (userCreated == null) {
            alert('Cette adresse email est déjà utilisée')
        } else {
            setUserCreated(userCreated);
        };

    } 

    if (userCreated) {
        return (
            <div className="SucessMessage">
                <h1>Utilisateur créé avec succès!</h1>
                <p>Id : {userCreated.id}</p>
                <p>Nom : {userCreated.fullName}</p>
                <p>Email : {userCreated.email}</p>
                <p>Rôle : {userCreated.role}</p>
            </div>
        );
    }

    return (
        <div className="AddUserContainer">
            <form onSubmit={handleSubmit}>
                <div className="InputContainer">
                    <label htmlFor="name">NOM :</label>
                    <input name='name' type="text" required/>
                    <label htmlFor="firstName">PRENOM :</label>
                    <input name='firstName' type="text" required/>
                    <label htmlFor="email">ADRESSE E-MAIL :</label>
                    <input name='email' type="email" required/>
                    <label htmlFor="password">MOT DE PASSE : </label>
                    <input name='password' type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$" title='Votre mot de passe doit contenir minimum 8 caractères, au moins 1 chiffre, 1 majuscule, 1 minuscle et 1 caractère spécial' required/>
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
                <button type="submit">Ajouter un Utilisateur</button>
            </form>
        </div>
        );
};
export default AddUser;