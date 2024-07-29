import React, { useState, useRef } from "react";
import { AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';

function Markers({ dataArray }) {
  // Initialiser l'état pour gérer l'ouverture de la fenêtre d'information pour chaque marqueur
  const [infowindowOpen, setInfowindowOpen] = useState(Array(dataArray.length).fill(false));

  // Utiliser useRef pour stocker les références de chaque marqueur
  const markerRefs = useRef([]);

  // Fonction pour ouvrir/fermer une fenêtre d'information pour un marqueur spécifique
  const handleMarkerClick = (index) => {
    const updatedInfowindowOpen = infowindowOpen.map((open, i) => i === index ? !open : false);
    setInfowindowOpen(updatedInfowindowOpen);
  };


  return (
    <>
      {dataArray.map((data, index) => (
        <React.Fragment key={index}>
          <AdvancedMarker
            position={data.location}
            ref={(ref) => markerRefs.current[index] = ref}
            onClick={() => handleMarkerClick(index)}
            title={`AdvancedMarker ${index + 1}`}
          />
          {infowindowOpen[index] && markerRefs.current[index] && (
            <InfoWindow
              anchor={markerRefs.current[index]}
              onCloseClick={() => handleMarkerClick(index)}
            >
              {data.name}
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default Markers;
