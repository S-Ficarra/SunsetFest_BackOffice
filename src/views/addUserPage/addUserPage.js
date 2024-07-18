import React from "react";
import './addUserPage.css'
import AddUser from "../../components/addUser/addUser";
import DashboardMenu from "../../components/dashboardMenu/dashboardMenu";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { GetUser } from "../../controllers/user.controller";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";


function AddUserPage () {

    /*authHeader got and placed here to handle the if condition to displaying the page only to administrator users, then passed as props to AddUser component to send the token to the API endpoint that check the role too*/

    const navigate = useNavigate();
    const authHeader = useAuthHeader()
    const userId = decodeToken(authHeader)
    const { user } = GetUser(authHeader, userId.sub)


    if (user.role === 'Administrateur') {
        return (
            <div className="PageContainer">
                <DashboardMenu />
                <div className="AddUserPage">
                    <AddUser authHeader={authHeader}/>    
                </div>    
            </div>
        );
    } else {
        navigate('/backoffice/dashboard');
    };

};
export default AddUserPage;