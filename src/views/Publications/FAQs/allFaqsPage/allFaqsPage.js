import React from "react";
import DashboardMenu from "../../../../components/dashboardMenu/dashboardMenu";
import AllFaqs from "../../../../components/Publications/FAQS/allFaqs/allFaqs";

function FaqsPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div className="FaqsComponentsContainer">
                <AllFaqs />
            </div>
        </div>
    );
};
export default FaqsPage;