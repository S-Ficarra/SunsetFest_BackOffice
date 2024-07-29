import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardMenu from "../../components/dashboardMenu/dashboardMenu";
import FullProgram from "../../components/Program/fullProgram";
import CreatePerformance from "../../components/Performances/createPerformance";


function ProgramPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <Routes>
                    <Route path='/' element={<FullProgram />} />
                    <Route path='/ajouter' element={<CreatePerformance />}/>
                    {/*<Route path='/:id/editer' element={<EditBand />}/>*/}
                </Routes>
            </div>
        </div>
    );

};
export default ProgramPage;