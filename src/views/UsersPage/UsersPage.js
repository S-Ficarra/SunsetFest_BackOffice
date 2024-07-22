import React, { useState, useEffect } from "react";
import './UsersPage.css'
import { Routes, Route } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { GetUser } from "../../controllers/user.controller";
import { decodeToken } from "react-jwt";
import DashboardMenu from "../../components/dashboardMenu/dashboardMenu";
import Profile from "../../components/Users/profile/profile";
import AllUsers from "../../components/Users/allUsers/allUsers";
import AddUser from "../../components/Users/addUser/addUser";
import EditUser from "../../components/Users/editUser/editUser";

function UsersPage () {

    /*authHeader fetched and placed here to handle the condition to displaying the add and edit page only to administrator users, then passed as props to the components to send the token to the API endpoint that check the role too*/

    /*useEffect is used to fetch the data (details of the userLogged) once the component is mounted, and fetch it again only if authHeader change*/

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
        <div className="PageContainer">
            <DashboardMenu />
            <Routes>
                <Route path='/' element={            
                    <div className="UserPage">
                        <Profile />
                        <AllUsers />
                    </div>} 
                />
                {user.role === 'Administrateur' ? (
                    <>
                        <Route path='/ajouter' element={<AddUser authHeader={authHeader} />} />
                        <Route path='/:id/editer' element={<EditUser authHeader={authHeader} />} />
                    </>
                ) : (
                    <Route 
                        path='*' 
                        element={
                            <div className="AccessDenied">
                                <h1>Accès Refusé</h1>
                                <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
                            </div>
                        } 
                    />
                )}
            </Routes>
        </div>
    );
};
export default UsersPage;