import React, { useState, useRef, useEffect } from "react";
import './markers.css'
import { Link } from "react-router-dom";
import { GetUser } from "../../../controllers/user.controller";
import { decodeToken } from "react-jwt";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';

function Markers({ dataArray, backgroundColor, Img }) {

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

  const [activeIndex, setActiveIndex] = useState(null);
  const markerRefs = useRef([]);

  const handleMarkerClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  

  return (
    <>
      {dataArray.map((data, index) => (
        <React.Fragment key={index}>
          <AdvancedMarker
            position={data.location}
            ref={(ref) => markerRefs.current[index] = ref}
            onClick={() => handleMarkerClick(index)}
            title={`${data.name}`}
          >
            <Pin
              background={backgroundColor}
              borderColor={backgroundColor}
              scale={1.5}
            >
            <div style={{ width: '100%', display:'flex', justifyContent:'center'}}>
              <img src={Img} alt="icon" style={{ width: '75%'}} />
            </div>
            </Pin>
          </AdvancedMarker>
          {activeIndex === index && markerRefs.current[index] && (
            <InfoWindow
              anchor={markerRefs.current[index]}
              onCloseClick={() => setActiveIndex(null)}
            >
              <div className="InfoWindow" key={data.id}>
                <h2>{data.name}</h2>
                {data.openingHour && <p>Ouvre à: {data.openingHour} heures</p>}
                {data.closingHour && <p>Ferme à: {data.closingHour} heures</p>}
                {data.merchType && <p>Magasin de : {data.merchType}</p>}
                {data.foodType && <p>Restaurant de : {data.foodType}</p>}
                {(userLogged.role === 'Administrateur' || userLogged.role === 'Editeur') && (
                <div className="MapButtonContainer">
                  <Link><button>Modifier</button></Link>
                  <button>Supprimer</button>
                </div>
                )}
              </div>
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default Markers;
