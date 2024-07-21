import React from "react"; 
import './editFaqPage.css'
import DashboardMenu from "../../../../components/dashboardMenu/dashboardMenu";
import EditFaq from "../../../../components/Publications/FAQS/editFaq/editFaq";

function EditFaqPage () {

    return (
        <div className="EditFaqPage">
            <DashboardMenu />
            <div className="EditFaqComponentContainer">
                <EditFaq />
            </div>
        </div>
    );

};
export default EditFaqPage;