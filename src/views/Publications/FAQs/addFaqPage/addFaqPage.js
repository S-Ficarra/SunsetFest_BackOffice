import React from "react";
import './addFaqPage.css'
import AddFaq from "../../../../components/Publications/FAQS/addFaq/addFaq";
import DashboardMenu from "../../../../components/dashboardMenu/dashboardMenu";

function AddFaqPage () {

    return (
        <div className="AddFaqPage">
            <DashboardMenu />
            <div className="AddFaqComponentContainer">
                <AddFaq />
            </div>
        </div>
    );

};
export default AddFaqPage;