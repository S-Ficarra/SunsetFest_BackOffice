import React, { useState, useEffect } from "react";
import './allBands.css'
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { decodeToken } from "react-jwt";
import { GetAllBands, DeleteBand } from "../../../controllers/band.controller";
import { GetUser } from "../../../controllers/user.controller";
import Pen from '../../../assets/pen-solid.svg'
import Trash from '../../../assets/trash-solid.svg'
import { convertToBase64 } from "../../../services/utils";

function AllBands () {

    const authHeader = useAuthHeader();
    const userId = decodeToken(authHeader);

    const [userLogged, setUserLogged] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const user = await GetUser(authHeader, userId.sub);
            setUserLogged(user)
        };

        fetchUser();
    }, [authHeader, userId.sub]);

    const [allBands, setAllBands] = useState([]);
    useEffect(() => {
        const fetchAllBands= async () => {
            try {
                const allBands = await GetAllBands(authHeader);
                setAllBands(allBands);
            } catch (error) {
                console.log(error)
            }
        };

        fetchAllBands();
    }, [authHeader]);

    const handleDelete = async (e, bandId) => {

        e.preventDefault();
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce groupe ?");

        if (confirmation) {
            try {
                await DeleteBand(authHeader, bandId);
                alert(`Groupe ${bandId} supprimé`);
                window.location.reload();
            } catch (error) {
                alert(`Erreur lors de la suppression du groupe : ${error.message}`);
            };
        };
    };

    if (allBands.length === 0) {
        return (
            <>
                <div className="ButtonContainerAllFaq">
                    <Link to="/backoffice/groupes/ajouter"><button>AJOUTER UN NOUVEAU GROUPE</button></Link>
                </div>
                <div className="EmptyTitle">
                    <h2>Il n'y a aucun Groupe pour le moment</h2>
                </div>
            </>
        )
    }


    return (
        <div>
            <div className="ButtonContainerAllFaq">
                <Link to="/backoffice/groupes/ajouter"><button>AJOUTER UN NOUVEAU GROUPE</button></Link>
            </div>
            <div className="AllBandsContainer">
                {allBands.map((band) => (
                    <div className="BandContainer" key={band.id}>
                        <img src={convertToBase64(band.thumbnailImage)} alt={band.name} />
                        <p>{band.name}</p>
                        {/*Allow only admin & editor to have the option to delete and edit */}
                        {(userLogged.role === 'Administrateur' || userLogged.role === 'Editeur') && (
                            <div className="ActionContainerBand">
                                <Link to={`/backoffice/groupes/${band.id}/editer`}>
                                    <button>
                                        <div className="EditContainer">
                                                <img src={Pen} alt="Modifier une Information" />
                                                <p>Modifier</p>
                                        </div>
                                    </button>
                                </Link>
                                <button onClick={(e) => handleDelete(e, band.id)}>
                                    <div className="DeleteContainer">
                                        <img src={Trash} alt="Supprimer une Information" />
                                        <p>Supprimer</p>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

};
export default AllBands;