import React from "react";
import DashboardMenu from "../../../../components/dashboardMenu/dashboardMenu";
import EditInformation from "../../../../components/Publications/Informations/editInformations/editInformations";

function EditInformationsPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <EditInformation />
            </div>
        </div>
    );

};
export default EditInformationsPage;