import React from "react";
import DashboardMenu from "../../../../components/dashboardMenu/dashboardMenu";
import AddInformation from "../../../../components/Publications/Informations/addInformations/addInformations";

function AddInformationsPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <AddInformation />
            </div>
        </div>
    );

};
export default AddInformationsPage