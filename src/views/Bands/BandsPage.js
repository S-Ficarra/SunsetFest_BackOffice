import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardMenu from "../../components/dashboardMenu/dashboardMenu";
import AllBands from "../../components/Bands/allBands/allBands";
import AddBand from "../../components/Bands/addband/addBand";


function BandsPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <Routes>
                    <Route path='/' element={<AllBands />} />
                    <Route path='/ajouter' element={<AddBand />}/>
                    {/*<Route path='/:id/editer' element={<EditFaq />}/>*/}
                </Routes>
            </div>
        </div>
    );

};
export default BandsPage;