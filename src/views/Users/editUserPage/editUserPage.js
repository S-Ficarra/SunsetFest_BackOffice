import React, {useState, useEffect} from "react";
import './editUserPage.css'
import EditUser from "../../../components/Users/editUser/editUser";
import DashboardMenu from "../../../components/dashboardMenu/dashboardMenu";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { GetUser } from "../../../controllers/user.controller";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";


function EditUserPage () {

    /*authHeader got and placed here to handle the if condition to displaying the page only to administrator users, then passed as props to EditUser component to send the token to the API endpoint that check the role too*/

    /*useEffect is used to fetch the data once the component is mounted, and fetch it again only if authHeader change*/

    const navigate = useNavigate();
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


    if (user.role === 'Administrateur') {
        return (
            <div className="PageContainer">
                <DashboardMenu />
                <div className="EditUserPage">
                    <EditUser authHeader={authHeader}/>    
                </div>    
            </div>
        );
    } else {
        navigate('/backoffice/dashboard');
    };

};
export default EditUserPage;