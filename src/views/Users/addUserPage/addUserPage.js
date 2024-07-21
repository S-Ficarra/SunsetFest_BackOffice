import React, {useState, useEffect} from "react";
import './addUserPage.css'
import AddUser from "../../../components/Users/addUser/addUser";
import DashboardMenu from "../../../components/dashboardMenu/dashboardMenu";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { GetUser } from "../../../controllers/user.controller";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";


function AddUserPage () {

    /*authHeader got and placed here to handle the if condition to display the page only to administrator users (to not be accessible by URL directly), then passed as props to AddUser component to send the token to the API endpoint that check the role too*/

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