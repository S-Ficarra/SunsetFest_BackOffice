import React from "react";
import './dashboard.css'
import { Link } from "react-router-dom";

function DashBoard () {


    return (
        <div className="DashboardButtons">
            {/*<Link to='/backoffice/alertes'><button>ALERTES</button></Link>*/}
            <Link to='/backoffice/actualites'><button>ACTUALITÉS</button></Link>
            <Link to='/backoffice/informations'><button>INFORMATIONS</button></Link>
            <Link to='/backoffice/faqs'><button>FAQS</button></Link>
            <Link to='/backoffice/groupes'><button>GROUPES</button></Link>
            <Link to='/backoffice/programme/2023'><button>PROGRAMME</button></Link>
            <Link to='/backoffice/carte'><button>CARTE</button></Link>
        </div>
    );
};
export default DashBoard;