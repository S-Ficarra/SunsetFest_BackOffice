import DashboardMenu from "../../../components/dashboardMenu/dashboardMenu";
import Profile from "../../../components/Users/profile/profile";
import AllUsers from "../../../components/Users/allUsers/allUsers";
import './usersPage.css'

function UsersPage () {

    
    /*authHeader not  placed here like editUserPage or addUserPage as condition for display are inside the users component and not here*/

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div className="UserPage">
                <Profile />
                <AllUsers />
            </div>
        </div>
    );
};
export default UsersPage;