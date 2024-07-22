import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardMenu from "../../../components/dashboardMenu/dashboardMenu";
import AllInformations from "../../../components/Publications/Informations/allInformations/allInformations";
import AddInformation from "../../../components/Publications/Informations/addInformations/addInformations";
import EditInformation from "../../../components/Publications/Informations/editInformations/editInformations";

function InformationsPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <Routes>
                    <Route path='/' element={<AllInformations />} />
                    <Route path='/ajouter' element={<AddInformation />}/>
                    <Route path='/:id/editer' element={<EditInformation />}/>
                </Routes>
            </div>
        </div>
    );

};
export default InformationsPage