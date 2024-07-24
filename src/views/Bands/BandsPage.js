import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardMenu from "../../components/dashboardMenu/dashboardMenu";
import AllBands from "../../components/Bands/allBands/allBands";
import AddBand from "../../components/Bands/addband/addBand";
import EditBand from "../../components/Bands/editBand/editBand";


function BandsPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <Routes>
                    <Route path='/' element={<AllBands />} />
                    <Route path='/ajouter' element={<AddBand />}/>
                    <Route path='/:id/editer' element={<EditBand />}/>
                </Routes>
            </div>
        </div>
    );

};
export default BandsPage;