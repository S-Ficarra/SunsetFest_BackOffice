import DashboardMenu from "../../components/dashboardMenu/dashboardMenu";
import LoggedUser from "../../components/loggedUser/loggedUser";
import Users from "../../components/users/users";
import './usersPage.css'

function UsersPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div className="UserPage">
                <LoggedUser />
                <Users />
            </div>
        </div>
    );
};
export default UsersPage;