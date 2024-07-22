import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardMenu from "../../../components/dashboardMenu/dashboardMenu";
import AllFaqs from "../../../components/Publications/FAQS/allFaqs/allFaqs";
import AddFaq from "../../../components/Publications/FAQS/addFaq/addFaq";
import EditFaq from "../../../components/Publications/FAQS/editFaq/editFaq";


function FaqsPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <Routes>
                    <Route path='/' element={<AllFaqs />} />
                    <Route path='/ajouter' element={<AddFaq />}/>
                    <Route path='/:id/editer' element={<EditFaq />}/>
                </Routes>
            </div>
        </div>
    );

};
export default FaqsPage;