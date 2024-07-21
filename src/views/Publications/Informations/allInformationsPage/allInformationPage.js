import React from "react";
import DashboardMenu from "../../../../components/dashboardMenu/dashboardMenu";
import AllInformations from "../../../../components/Publications/Informations/allInformations/allInformations";

function AllInformationsPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <AllInformations />
            </div>
        </div>
    );

};
export default AllInformationsPage