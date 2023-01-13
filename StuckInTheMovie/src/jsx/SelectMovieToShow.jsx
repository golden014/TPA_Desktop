import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import Navbar from "./Navbar"


function SelectMovieToShow(){



    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    

    const history = useNavigate();
    const next = (e) => {
        e.preventDefault();

        sessionStorage.setItem("StartDate", startDate);
        sessionStorage.setItem("EndDate", endDate);
        history("/generateMovieSchedule");
    }

    return (

        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <form action="" className="formm">

                    <div className="formComponent">
                        <label htmlFor="">Start Date</label> 
                        <input type="date" onChange={(event) => {setStartDate(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">End Date</label> 
                        <input type="date" onChange={(event) => {setEndDate(event.target.value)}}/>
                    </div>
                    
                    <div className="formComponent">
                        <button onClick={next}>Select Available Movie</button>
                    </div>

  
                </form>
            </div>
        </div>
    )
}

export default SelectMovieToShow;