import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import './festivalMap.css';
import Markers from "../markers/markers";
import StageIcon from '../../../assets/music-solid.svg';
import ToiletIcon from '../../../assets/restroom-solid.svg';
import CampingIcon from '../../../assets/campground-solid.svg';
import VipIcon from '../../../assets/vip-solid.svg';
import FoodIcon from '../../../assets/food-solid.svg';
import ShopIcon from '../../../assets/shop-solid.svg';
import BarIcon from '../../../assets/drink-solid.svg';
import { useAllStages } from "../../../hooks/useAllStages";
import { useAllToilets } from "../../../hooks/useAllToilets";
import { useAllCampings } from "../../../hooks/useAllCampings";
import { useAllVips } from "../../../hooks/useAllVips";
import { useAllBars } from "../../../hooks/useAllBars";
import { useAllRestaurants } from "../../../hooks/useAllRestaurants";
import { useAllMerchandisings } from "../../../hooks/useAllMerchandisings";

function FestivalMap() {

    const { allStages } = useAllStages();
    const { allToilets } = useAllToilets();
    const { allCampings } = useAllCampings();
    const { allVips } = useAllVips();
    const { allBars } = useAllBars();
    const { allRestaurants } = useAllRestaurants();
    const { allMerchandisings } = useAllMerchandisings();

    const [clickPosition, setClickPosition] = useState(null);
    const [filters, setFilters] = useState({
        stages: true,
        toilets: true,
        campings: true,
        vips: true,
        bars: true,
        restaurants: true,
        merchandisings: true,
    });

    const handleMapClick = (event) => {
        const latitude = event.detail.latLng.lat;
        const longitude = event.detail.latLng.lng;
        console.log('latitude', latitude, 'longitude', longitude);
        setClickPosition({ lat: latitude, lng: longitude });
    };

    const handleFilterChange = (category) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [category]: !prevFilters[category],
        }));
    };

    return (
        <div id="map-container">
            <div id="filters">
                <label>
                    <input type="checkbox" checked={filters.stages} onChange={() => handleFilterChange('stages')}/>
                    Scènes
                </label>
                <label>
                    <input type="checkbox" checked={filters.toilets} onChange={() => handleFilterChange('toilets')}/>
                    Toilettes
                </label>
                <label>
                    <input type="checkbox" checked={filters.campings} onChange={() => handleFilterChange('campings')}/>
                    Campings
                </label>
                <label>
                    <input type="checkbox" checked={filters.vips} onChange={() => handleFilterChange('vips')}/>
                    VIP
                </label>
                <label>
                    <input type="checkbox" checked={filters.bars} onChange={() => handleFilterChange('bars')}/>
                    Bars
                </label>
                <label>
                    <input type="checkbox" checked={filters.restaurants} onChange={() => handleFilterChange('restaurants')}/>
                    Restaurants
                </label>
                <label>
                    <input type="checkbox" checked={filters.merchandisings} onChange={() => handleFilterChange('merchandisings')}/>
                    Marchandises
                </label>
            </div>
            <div id="map">
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                    <Map
                        defaultZoom={15}
                        mapId={process.env.REACT_APP_MAP_ID}
                        defaultCenter={{ lat: 43.723760, lng: 3.749468 }}
                        onClick={handleMapClick}
                    >
                        {filters.stages && <Markers dataArray={allStages} backgroundColor={'#e2557f'} Img={StageIcon} />}
                        {filters.toilets && <Markers dataArray={allToilets} backgroundColor={'#0013FF'} Img={ToiletIcon} />}
                        {filters.campings && <Markers dataArray={allCampings} backgroundColor={'green'} Img={CampingIcon} />}
                        {filters.vips && <Markers dataArray={allVips} backgroundColor={'black'} Img={VipIcon} />}
                        {filters.bars && <Markers dataArray={allBars} backgroundColor={'#ffb703'} Img={BarIcon} />}
                        {filters.restaurants && <Markers dataArray={allRestaurants} backgroundColor={'#9a031e'} Img={FoodIcon} />}
                        {filters.merchandisings && <Markers dataArray={allMerchandisings} backgroundColor={'purple'} Img={ShopIcon} />}
                        {clickPosition && (
                            <AdvancedMarker position={clickPosition} title="Clicked Location" />
                        )}
                    </Map>
                </APIProvider>
            </div>
        </div>
    );
}

export default FestivalMap;
