import DashboardMenu from "../../components/dashboardMenu/dashboardMenu";
import Profile from "../../components/profile/profile";
import Users from "../../components/users/users";
import './usersPage.css'

function UsersPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div className="UserPage">
                <Profile />
                <Users />
            </div>
        </div>
    );
};
export default UsersPage;