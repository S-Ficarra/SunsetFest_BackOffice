import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardMenu from "../../../components/dashboardMenu/dashboardMenu";
import AllNews from "../../../components/Publications/News/allNews/allNews";
import AddNews from "../../../components/Publications/News/addNews/addNews";
import EditNews from "../../../components/Publications/News/editNews/editNews";

function NewsPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <Routes>
                    <Route path='/' element={<AllNews />} />
                    <Route path='/ajouter' element={<AddNews />}/>
                    <Route path='/:id/editer' element={<EditNews />}/>
                </Routes>
            </div>
        </div>
    );


}
export default NewsPage;