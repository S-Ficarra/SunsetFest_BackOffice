import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
import './festivalMap.css';
import Filters from "../filters/filters";
import Markers from "../markers/markers";
import AddLocation from "../addLocation/addLocation";
import EditLocation from "../editLocation/editLocation";
import { StageIcon, ToiletIcon, CampingIcon, VipIcon, FoodIcon, ShopIcon, BarIcon } from "../../../assets/iconsModule";
import { useAllStages } from "../../../hooks/Facilities/useAllStages";
import { DeleteStage } from "../../../controllers/Facilities/stages.controller";
import { useAllToilets } from "../../../hooks/Facilities/useAllToilets";
import { DeleteToilet } from "../../../controllers/Facilities/toilet.controller";
import { useAllCampings } from "../../../hooks/Facilities/useAllCampings";
import { DeleteCamping } from "../../../controllers/Facilities/camping.controller";
import { useAllVips } from "../../../hooks/Facilities/useAllVips";
import { DeleteVip } from "../../../controllers/Facilities/vip.controller";
import { useAllBars } from "../../../hooks/Facilities/useAllBars";
import { DeleteBar } from "../../../controllers/Facilities/bar.controller";
import { useAllRestaurants } from "../../../hooks/Facilities/useAllRestaurants";
import { DeleteRestaurant } from "../../../controllers/Facilities/restaurant.controller";
import { useAllMerchandisings } from "../../../hooks/Facilities/useAllMerchandisings";
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
    const [showEditLocation, setShowEditLocation] = useState(false);
    const [locationToEdit, setLocationToEdit] = useState()
   

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

    //function to make the ID come up from markers and be send down to EditLocation
    const handleEditLocation = (id, type) => {
        setLocationToEdit({id: id, type: type})
        setClickPosition({ lat: 43.727454016718504, lng: 3.7493905082638257 });
        setShowEditLocation(!showEditLocation)
    }


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
                    >   {/*Delete controller passed direclty in the markers to be able to delete POI from them */}
                        {filters.stages && <Markers dataArray={allStages} backgroundColor={'#e2557f'} Img={StageIcon} 
                        deleteController={DeleteStage} handleEditLocation={handleEditLocation}/>}
                        {filters.toilets && <Markers dataArray={allToilets} backgroundColor={'#0013FF'} Img={ToiletIcon} deleteController={DeleteToilet} handleEditLocation={handleEditLocation}/>}
                        {filters.campings && <Markers dataArray={allCampings} backgroundColor={'green'} Img={CampingIcon} deleteController={DeleteCamping} handleEditLocation={handleEditLocation}/>}
                        {filters.vips && <Markers dataArray={allVips} backgroundColor={'black'} Img={VipIcon} 
                        deleteController={DeleteVip} handleEditLocation={handleEditLocation}/>}
                        {filters.bars && <Markers dataArray={allBars} backgroundColor={'#ffb703'} Img={BarIcon} 
                        deleteController={DeleteBar} handleEditLocation={handleEditLocation}/>}
                        {filters.restaurants && <Markers dataArray={allRestaurants} backgroundColor={'#9a031e'} Img={FoodIcon} deleteController={DeleteRestaurant} handleEditLocation={handleEditLocation}/>}
                        {filters.merchandisings && <Markers dataArray={allMerchandisings} backgroundColor={'purple'} Img={ShopIcon} deleteController={DeleteMerchandising} handleEditLocation={handleEditLocation}/>}
                        {clickPosition && (showAddLocation || showEditLocation) && (
                            <AdvancedMarker position={clickPosition} title="Nouveau lieu" >
                                <Pin
                                background={'white'}
                                borderColor={'black'}
                                scale={2}>
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
            {showEditLocation && (
                <EditLocation
                    clickPosition={clickPosition}
                    locationToEdit={locationToEdit}
                    handleEditLocation={handleEditLocation}
                />
            )}
        </div>
    );
}

export default FestivalMap;
