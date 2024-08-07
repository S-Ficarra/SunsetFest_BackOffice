import React, { useState }from "react";
import './fullProgram.css'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import FirstDay from "./firstDay/firstDay";
import SecondDay from "./secondDay/secondDay";
import ThirdDay from "./thirdDay/thirdDay";
import { Link } from "react-router-dom";
import { useProgram } from "../../hooks/useProgram";


function FullProgram () {

    const year = 2023 
    const authHeader = useAuthHeader();
   
    const { performances } = useProgram(authHeader, year)
    const [daySelected, setDaySelected] = useState('friday');

    const handleClick = (e, value) => {
        e.preventDefault()
        setDaySelected(value)
    }
    
    if (performances.length === 0) {
        return <div>chargement</div>
    }

    return (
        <div>
            <div className="FullProgramDaysButton">
                <button id={daySelected === 'friday' ? 'Selected' : ''} onClick={(e) => {handleClick(e, 'friday')}}>Vendredi</button>
                <button id={daySelected === 'saturday' ? 'Selected' : ''} onClick={(e) => {handleClick(e, 'saturday')}}>Samedi</button>
                <button id={daySelected === 'sunday' ? 'Selected' : ''} onClick={(e) => {handleClick(e, 'sunday')}}>Dimanche</button>
            </div>
            {daySelected === 'friday' && <FirstDay performances={performances} />}
            {daySelected === 'saturday' && <SecondDay performances={performances} />}
            {daySelected === 'sunday' && <ThirdDay performances={performances} />}
            <div className="AddPerformanceButton">
                <Link to='ajouter' ><button>Ajouter une performance</button></Link>
            </div>
        </div>
    );
};
export default FullProgram;