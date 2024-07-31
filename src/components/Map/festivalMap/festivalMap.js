import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
import './festivalMap.css';
import Filters from "../filters/filters";
import Markers from "../markers/markers";
import AddLocation from "../addLocation/addLocation";
import { StageIcon, ToiletIcon, CampingIcon, VipIcon, FoodIcon, ShopIcon, BarIcon } from "../../../assets/iconsModule";
import { useAllStages } from "../../../hooks/useAllStages";
import { DeleteStage } from "../../../controllers/Facilities/stages.controller";
import { useAllToilets } from "../../../hooks/useAllToilets";
import { DeleteToilet } from "../../../controllers/Facilities/toilet.controller";
import { useAllCampings } from "../../../hooks/useAllCampings";
import { DeleteCamping } from "../../../controllers/Facilities/camping.controller";
import { useAllVips } from "../../../hooks/useAllVips";
import { DeleteVip } from "../../../controllers/Facilities/vip.controller";
import { useAllBars } from "../../../hooks/useAllBars";
import { DeleteBar } from "../../../controllers/Facilities/bar.controller";
import { useAllRestaurants } from "../../../hooks/useAllRestaurants";
import { DeleteRestaurant } from "../../../controllers/Facilities/restaurant.controller";
import { useAllMerchandisings } from "../../../hooks/useAllMerchandisings";
import { DeleteMerchandising } from "../../../controllers/Facilities/merchandising.controller";

function FestivalMap() {

    const { allStages } = useAllStages();
    const { allToilets } = useAllToilets();
    const { allCampings } = useAllCampings();
    const { allVips } = useAllVips();
    const { allBars } = useAllBars();
    const { allRestaurants } = useAllRestaurants();
    const { allMerchandisings } = useAllMerchandisings();

    const [showAddLocation, setShowAddLocation] = useState(false);
    const [clickPosition, setClickPosition] = useState();

    const [filters, setFilters] = useState({
        stages: true,
        toilets: true,
        campings: true,
        vips: true,
        bars: true,
        restaurants: true,
        merchandisings: true,
    });

    const handleShowAddLocation = () => {
        setShowAddLocation(!showAddLocation);
        setClickPosition({ lat: 43.727454016718504, lng: 3.7493905082638257 });
    }

    const handleMapClick = (event) => {
        const latitude = event.detail.latLng.lat;
        const longitude = event.detail.latLng.lng;
        setClickPosition({ lat: latitude, lng: longitude });
    };

    const handleFilterChange = (category) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [category]: !prevFilters[category],
        }));
    };


    return (
        <div className="MapContainer">
            <div id="map">
            <Filters filters={filters} onFilterChange={handleFilterChange} />
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                    <Map
                        defaultZoom={15}
                        mapId={process.env.REACT_APP_MAP_ID}
                        defaultCenter={{ lat: 43.727454016718504, lng: 3.7493905082638257}}
                        onClick={handleMapClick}
                    >
                        {filters.stages && <Markers dataArray={allStages} backgroundColor={'#e2557f'} Img={StageIcon} 
                        deleteController={DeleteStage}/>}
                        {filters.toilets && <Markers dataArray={allToilets} backgroundColor={'#0013FF'} Img={ToiletIcon} deleteController={DeleteToilet} />}
                        {filters.campings && <Markers dataArray={allCampings} backgroundColor={'green'} Img={CampingIcon} deleteController={DeleteCamping}/>}
                        {filters.vips && <Markers dataArray={allVips} backgroundColor={'black'} Img={VipIcon} 
                        deleteController={DeleteVip}/>}
                        {filters.bars && <Markers dataArray={allBars} backgroundColor={'#ffb703'} Img={BarIcon} 
                        deleteController={DeleteBar}/>}
                        {filters.restaurants && <Markers dataArray={allRestaurants} backgroundColor={'#9a031e'} Img={FoodIcon} deleteController={DeleteRestaurant}/>}
                        {filters.merchandisings && <Markers dataArray={allMerchandisings} backgroundColor={'purple'} Img={ShopIcon} deleteController={DeleteMerchandising}/>}
                        {clickPosition && showAddLocation && (
                            <AdvancedMarker position={clickPosition} title="Nouveau lieu" >
                                <Pin
                                background={'white'}
                                borderColor={'black'}
                                scale={1.5}>
                                </Pin>
                            </AdvancedMarker>
                        )}
                    </Map>
                </APIProvider>
            <div className="ButtonContainerAllFaq">
                <button onClick={handleShowAddLocation}>{showAddLocation ? 'ANNULER' : 'AJOUTER UN NOUVEAU LIEU'}</button>
            </div>
            </div>

            {showAddLocation && (
                <AddLocation
                    clickPosition={clickPosition}
                />
            )}
        </div>
    );
}

export default FestivalMap;
