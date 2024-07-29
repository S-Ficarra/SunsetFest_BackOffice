import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardMenu from "../../components/dashboardMenu/dashboardMenu";
import FestivalMap from "../../components/Map/map";

function MapPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <Routes>
                    <Route path='/' element={<FestivalMap />} />
                    {/*<Route path='/ajouter' element={<AddInformation />}/>
                    <Route path='/:id/editer' element={<EditInformation />}/>*/}
                </Routes>
            </div>
        </div>
    );

};
export default MapPage;