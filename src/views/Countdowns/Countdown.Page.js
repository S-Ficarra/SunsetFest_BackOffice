import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardMenu from "../../components/dashboardMenu/dashboardMenu";
import AllCountdowns from "../../components/Countdowns/allCountdowns/allCountdowns";
import AddCountdown from "../../components/Countdowns/addCountdown/addCountdown";
import EditCountdown from "../../components/Countdowns/editCountdown/editCoundown";


function CountdownPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <Routes>
                    <Route path='/' element={<AllCountdowns />} />
                    <Route path='/ajouter' element={<AddCountdown />}/>
                    <Route path='/:id/editer' element={<EditCountdown />}/>
                </Routes>
            </div>
        </div>
    );

};
export default CountdownPage;