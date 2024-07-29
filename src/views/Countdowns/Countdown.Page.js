import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardMenu from "../../components/dashboardMenu/dashboardMenu";
import AllCountdowns from "../../components/Countdowns/allCountdowns/allCountdowns";


function CountdownPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <Routes>
                    <Route path='/' element={<AllCountdowns />} />
                    {/*<Route path='/ajouter' element={<AddBand />}/>
                    <Route path='/:id/editer' element={<EditBand />}/>*/}
                </Routes>
            </div>
        </div>
    );

};
export default CountdownPage;