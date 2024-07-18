import React from "react";
import './dashboardMenu.css'
import { useNavigate } from 'react-router-dom';
import HeroLogo from '../../assets/HeroLogo.png'
import SettingsLogo from '../../assets/gear-solid.svg'
import { Link } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';



function DashboardMenu () {

    const naviguate = useNavigate()
    const signOut = useSignOut()


    const logOut = () => {
        signOut()
        naviguate('/backoffice/login')
    } 

    return (
        <div className="MenuContainer">
            <div className="ImgContainer">
                <img src={HeroLogo} alt="" />
            </div>
            <div className="ButtonContainer">
                <Link to='/backoffice/alertes'><button>ALERTES</button></Link>
                <Link to='/backoffice/carte'><button>CARTE</button></Link>
                <Link to='/backoffice/informations'><button>INFORMATIONS</button></Link>
                <Link to='/backoffice/programme'><button>PROGRAMME</button></Link>
                <Link to='/backoffice/faqs'><button>FAQS</button></Link>
                <Link to='/backoffice/actualites'><button>ACTUALITÉS</button></Link>
                <Link to='/backoffice/groupes'><button>GROUPES</button></Link>
            </div>
            <div className="BottomContainer">
                <Link to='/backoffice/utilisateurs'>
                    <img src={SettingsLogo} alt="Paramètres" />
                </Link>
                <button onClick={() => logOut()}>SE DÉCONNECTER</button>
            </div>
        </div>
    );
};
export default DashboardMenu;