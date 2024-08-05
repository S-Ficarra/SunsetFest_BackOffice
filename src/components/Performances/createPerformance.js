import React, { useState, useEffect } from "react";
import { GetAllBands } from "../../controllers/band.controller";
import { GetAllStages } from "../../controllers/Facilities/stages.controller";
import { AddPerformanceToProgram } from "../../controllers/program.controller";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { formatDateProgram } from "../../services/utils";
import { Link } from "react-router-dom";
import './createPerformance.css'


function CreatePerformance () {

    const year = 2023

    const authHeader = useAuthHeader();
    const [performanceCreated, setPerformanceCreated] = useState()
    const [formState, setFormState] = useState({
        band: '',
        stage: '',
        timeFrame: ''
    });

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

    const [allStages, setAllStages] = useState([]);
    useEffect(() => {
        const fetchAllStages= async () => {
            try {
                const allStages = await GetAllStages(authHeader);
                setAllStages(allStages);
            } catch (error) {
                console.log(error)
            }
        };

        fetchAllStages();
    }, [authHeader]);

    const [timeFrames, setTimeFrames] = useState([]);
    useEffect(() => {
        const fetchTimeFrames = async () => {
            try {
                const response = await fetch('/timeFrame.json');
                const data = await response.json();

                setTimeFrames(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTimeFrames();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let performanceAdded = await AddPerformanceToProgram(authHeader, year, formState);
            setPerformanceCreated(performanceAdded.perfData);
        } catch (error) {
            alert(error.message); 
        };

    };

    const handleResetForm = () => {
        setPerformanceCreated();
    };


    if (performanceCreated) {
        return (
            <div className="SucessMessage">
            <h1>Performance créé avec succès!</h1>
            <p><span>ID :</span> {performanceCreated._id}</p>
            <p><span>Groupe :</span> {performanceCreated._band._name}</p>
            <p><span>Scène :</span> {performanceCreated._stage._name}</p>
            <p><span>Passage :</span> {formatDateProgram(performanceCreated._timeFrame._startingTime)}</p>
            <Link to='/backoffice/programme/2023'><button>Retour au programme</button></Link>
            <button onClick={handleResetForm}>Ajouter une nouvelle performance</button>
        </div>
        )
    }

    return (
        <div className="MainContainerPerf">
            <form onSubmit={handleSubmit}>
                <div className="SelectContainer">
                    <label htmlFor="band">Choisissez le groupe</label><br/>
                    <select name="band" id="band" onChange={(e) => {handleChange(e)}} required>
                    <option value=''>Selectionnez un groupe</option>
                        {allBands.map(band => (
                            <option key={band.id} value={band.id} >{band.name}</option>
                        ))}
                    </select>
                </div>
                <div className="SelectContainer">
                    <label htmlFor="stage">Choisissez la scène</label><br/>
                    <select name="stage" id="stage" onChange={(e) => {handleChange(e)}} required>
                        <option value=''>Selectionnez une scène</option>
                        {allStages.map(stage => (
                            <option key={stage.id} value={stage.id}>{stage.name}</option>
                        ))}
                    </select>
                </div>
                <div className="SelectContainer">
                    <label htmlFor="timeFrame">Choisissez le passage</label><br/>
                    <select name="timeFrame" id="timeFrame" onChange={(e) => {handleChange(e)}} required>
                        <option value=''>Selectionnez un passage</option>
                        {timeFrames.map(timeFrame => (
                            <option key={timeFrame.id} value={timeFrame.id}>{formatDateProgram(timeFrame.starting_time)}</option>
                        ))}
                    </select>
                </div>
                <div className="AddPerformanceButton">
                    <button type="submit">Enregistrer</button>
                    <Link to='/backoffice/programme/2023'><button type="submit">Annuler</button></Link>
                </div>
            </form>
        </div>
    );

};
export default CreatePerformance;