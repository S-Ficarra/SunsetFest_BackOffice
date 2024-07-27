import React, { useState, useEffect } from "react";
import { GetAllBands } from "../../controllers/band.controller";
import { GetAllStages } from "../../controllers/stages.controller";
import { AddPerformanceToProgram } from "../../controllers/program.controller";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { formatDateProgram } from "../../services/utils";


function CreatePerformance () {

    const year = 2023

    const authHeader = useAuthHeader();
    const [performanceCreated, setPerformanceCreated] = useState()
    const [formState, setFormState] = useState({
        band: '',
        stage: '',
        timeFrame: ''
    });

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
            setPerformanceCreated(performanceAdded);
        } catch (error) {
            alert(error.message); 
        };

    };

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

    console.log(formState);


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <select name="band" id="band" onChange={(e) => {handleChange(e)}}>
                    <option>Selectionnez un groupe</option>
                        {allBands.map(band => (
                            <option key={band.id} value={band.id} >{band.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select name="stage" id="stage" onChange={(e) => {handleChange(e)}}>
                        <option>Selectionnez une scène</option>
                        {allStages.map(stage => (
                            <option key={stage.id} value={stage.id}>{stage.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select name="timeFrame" id="timeFrame" onChange={(e) => {handleChange(e)}}>
                        <option>Selectionnez un passage</option>
                        {timeFrames.map(timeFrame => (
                            <option key={timeFrame.id} value={timeFrame.id}>{formatDateProgram(timeFrame.starting_time)}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );

};
export default CreatePerformance;