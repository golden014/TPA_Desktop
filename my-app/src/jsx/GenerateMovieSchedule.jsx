
import Navbar from "./Navbar";


function GenerateMovieSchedule() {

    const startDate = sessionStorage.getItem("StartDate");
    const endDate = sessionStorage.getItem("EndDate");

    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                
            </div>
        </div>
    )
}

export default GenerateMovieSchedule;