import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { db } from "../firebase-config";
import Navbar from "./Navbar"

const ViewSeat = () => {
    const location = useLocation();
    const schedule = location.state.identifier;

    const studioRef = collection(db, "Studios");
    const [studio, setStudio] = useState([]);

    useEffect(() => {
        const getStudio = async () => {
            const data = await getDocs(studioRef);
                setStudio(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getStudio();
    }, []);

    let seatCount = 0;
    for (let i = 0; i<studio.length; i++) {
        if (studio[i].ID === schedule.StudioID) {
            seatCount = studio[i].SeatCount;
            break;
        }
    }

    const row = 15;
    const seatPerRow = seatCount / row;
    
    const selectedSeat = [];

    function selectSeat(e, id) {
        //kalau udah ke select
        if (document.getElementById(id).style.color === "white") {
            for (let i = 0; i<selectedSeat.length; i++) {
                if (selectedSeat[i] === id) {
                    document.getElementById(id).style.backgroundColor = "white";
                    document.getElementById(id).style.color = "black";
                    selectedSeat.splice(i, 1);
                }
            }
        } 
        //kalau belum ke select
        else {
            document.getElementById(id).style.color = "white";
            document.getElementById(id).style.backgroundColor = "#05CAF7";
            selectedSeat.push(id);
        }
        
        console.log(selectedSeat);
    }

    

    //15 seat di tiap row nya
    const getSeatRow = (i) => {
        const seatList = [];

        for (let j = 1; j <= row; j++) {
            seatList.push(
                <button className="seatButton" id={j + (i * row)} onClick={(e) => selectSeat(e, (j + (i * row)))}>
                    {j + (i * row)}
                </button>
            )
        }

        return seatList;
    }

    //jumlah row nya
    const getSeatList = () => {
        const seatRowList = [];

        for (let i = 0; i < seatPerRow; i++) {
            seatRowList.push(
                <div className="seatRowContainer">
                {
                    getSeatRow(i)
                }
                </div>
            )
        }

        return seatRowList;
    }

    console.log(seatCount);



    return (

        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Available Seat</h2>

                <div>
                    <h3>———————————————————————————   Screen   ———————————————————————————</h3>
                </div>
                <div className="seats">
                    {getSeatList()}
                </div>

                <button> Buy Ticket(s) </button>
            </div>
        </div>
    )
}

export default ViewSeat;