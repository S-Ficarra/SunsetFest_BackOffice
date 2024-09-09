import { DeletePerformanceFromProgram } from "../../../controllers/program.controller";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { decodeToken } from "react-jwt";
import { useUser } from "../../../hooks/useUser";


function ThirdDay ({performances}) {

    const year = '2023'

    const authHeader = useAuthHeader();
    const userId = decodeToken(authHeader)
    const { userLogged } = useUser(authHeader, userId.sub)


    const handleDelete = async (e, performanceId) => {

        e.preventDefault();
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette performance ?");

        if (confirmation) {
            try {
                await DeletePerformanceFromProgram(authHeader, year, performanceId)
                alert(`Performance ${performanceId} supprimé`);
                window.location.reload();
            } catch (error) {
                alert(`Erreur lors de la suppression de la performance : ${error.message}`);
            };
        };
    };

    const sundayPerfs = performances.filter(performance => {
        const startingTime = new Date(performance._timeFrame._startingTime.slice(0, -1));
        return startingTime.getDay() === 0;
    });

    return (
        <div className="AllStageContainer">
            <div className="TimeListContainer">
                <h2 className="row-14">14H</h2>
                <h2 className="row-16">16H</h2>
                <h2 className="row-18">18H</h2>
                <h2 className="row-20">20H</h2>
                <h2 className="row-22">22H</h2>
            </div>
            <div className="StageContainer">
                <h1 className="top-row">SCENE<br/>ROXY</h1>
                {sundayPerfs
                    .filter(performance => String(performance._stage._id) === '1')
                    .map(performance => {
                        const time =  new Date (performance._timeFrame._startingTime.slice(0, -1))
                        const hour = time.getHours()
                        return (
                            <div key={performance._id} className={`row-${hour} PerformanceContainer`}>
                                <p>{performance._band._name}</p>
                                {(userLogged.role === 'Administrateur' || userLogged.role === 'Editeur') && (
                                <div>
                                    <button onClick={(e) => handleDelete(e, performance._id)}>Supprimer du programme</button>
                                </div>
                                )}
                            </div>)
                    })}
            </div>
            <div className="StageContainer">
                <h1 className="top-row">SCENE<br/>RAINBOW</h1>
                {sundayPerfs
                    .filter(performance => String(performance._stage._id) === '2')
                    .map(performance => {
                        const time =  new Date (performance._timeFrame._startingTime.slice(0, -1))
                        const hour = time.getHours()
                        return (
                            <div key={performance._id} className={`row-${hour} PerformanceContainer`}>
                                <p>{performance._band._name}</p>
                                {(userLogged.role === 'Administrateur' || userLogged.role === 'Editeur') && (
                                <div>
                                    <button onClick={(e) => handleDelete(e, performance._id)}>Supprimer du programme</button>
                                </div>
                                )}
                            </div>)
                    })}
            </div>
            <div className="StageContainer">
                <h1 className="top-row">SCENE<br/>WHISKEY</h1>
                {sundayPerfs
                    .filter(performance => String(performance._stage._id) === '3')
                    .map(performance => {
                        const time =  new Date (performance._timeFrame._startingTime.slice(0, -1))
                        const hour = time.getHours()
                        return (
                            <div key={performance._id} className={`row-${hour} PerformanceContainer`}>
                                <p>{performance._band._name}</p>
                                {(userLogged.role === 'Administrateur' || userLogged.role === 'Editeur') && (
                                <div>
                                    <button onClick={(e) => handleDelete(e, performance._id)}>Supprimer du programme</button>
                                </div>
                                )}
                            </div>)
                    })}
            </div>
            <div className="StageContainer">
                <h1 className="top-row">SCENE<br/>VIPER</h1>
                {sundayPerfs
                    .filter(performance => String(performance._stage._id) === '4')
                    .map(performance => {
                        const time =  new Date (performance._timeFrame._startingTime.slice(0, -1))
                        const hour = time.getHours()
                        return (
                            <div key={performance._id} className={`row-${hour} PerformanceContainer`}>
                                <p>{performance._band._name}</p>
                                {(userLogged.role === 'Administrateur' || userLogged.role === 'Editeur') && (
                                <div>
                                    <button onClick={(e) => handleDelete(e, performance._id)}>Supprimer du programme</button>
                                </div>
                                )}
                            </div>)
                    })}
            </div>
        </div>
    )

}
export default ThirdDay;