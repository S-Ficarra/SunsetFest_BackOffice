import React from "react";
import './dashboardPage.css'
import DashboardMenu from "../../components/dashboardMenu/dashboardMenu";
import DashBoard from "../../components/dashboard/dashboard";

function DashboardPage () {

    return(
        <div className="PageContainer"> 
            <DashboardMenu />
            <DashBoard />
        </div>
    );
};
export default DashboardPage;