import React, {useState} from "react";
import {APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';
import { useAllStages } from "../../hooks/useAllStages";
import './map.css'
import Markers from "./markers";




function FestivalMap () {

    const { allStages } = useAllStages()





    const [clickPosition, setClickPosition] = useState(null);




    if (!allStages) {
       return <div>Chargement...</div>;
    }

    const handleMapClick = (event) => {
        const latitude = event.detail.latLng.lat
        const longitude = event.detail.latLng.lng
        console.log('latitude', latitude, 'longitude', longitude);
        setClickPosition({ lat: latitude, lng: longitude });

    };



    return (

        <div id="map">
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                defaultZoom={5}
                mapId={process.env.REACT_APP_MAP_ID}
                defaultCenter={ { lat: 45.676057, lng: 4.581353 }}
                onClick={handleMapClick} // Ajoutez l'événement de clic sur la carte ici

                >
                    <Markers dataArray={allStages}/>
                    {clickPosition && (
                        <AdvancedMarker
                            position={clickPosition}
                            title="Clicked Location"
                        />
                    )}
                </Map>
            </APIProvider>
        </div>

    )

};
export default FestivalMap;