import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from "../actions/useSnapCollection";
import { db } from "../firebase-config";
import { useSnapCollection } from "../lib/useSnapCollection";
import Navbar from "./Navbar"

const ViewSeat = () => {
    
    const location = useLocation();
    const schedule = location.state.identifier;
    const history = useNavigate();

    // const studioRef = collection(db, "Studios");
    // const [studio, setStudio] = useState([]);
    const studtioState = useSnapCollection(query(collection(db, "Studios")))

    // const [seats, setSeats] = useState([]);
    // const seatsRef = collection(db, "Seats");
    const seatsState = useSnapCollection(query(collection(db, "Seats")))

    // useEffect(() => {
    //     const getSeat = async () => {
    //         const dataa = await getDocs(seatsRef);
    //         setSeats(dataa.docs.map((doc) => ({...doc.data(), id: doc.id})));
    //     }
    //     getSeat();
    // }, []);

    // useEffect(() => {
    //     const getStudio = async () => {
    //         const data = await getDocs(studioRef);
    //             setStudio(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    //     }
    //     getStudio();
    // }, []);

    

    if (studtioState.status === FIRESTORE_FETCH_LOADING) return <div>Loading...</div>
    if (studtioState.status === FIRESTORE_FETCH_ERROR) return <div>Error: {studtioState.error}</div>

    if (seatsState.status === FIRESTORE_FETCH_LOADING) return <div>Loading...</div>
    if (seatsState.status === FIRESTORE_FETCH_ERROR) return <div>Error: {seatsState.error}</div>

    console.log(studtioState.data)
    console.log(seatsState.data)

    let seatCount = 0;
    for (let i = 0; i<studtioState.data.length; i++) {
        if (studtioState.data[i].ID === schedule.StudioID) {
            seatCount = studtioState.data[i].SeatCount;
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
        // console.log("selected seat: ");
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

    // //jumlah row nya
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
    // const [price, setPrice] = useState(0);
    // const [type, setType] = useState("");

    const loopForType = () => {
        console.log("masuk loop for type");
        // console.log(data);
        for (let i = 0; i<studtioState.data.length; i++) {
            console.log("i = " + i);
            console.log( studtioState.data[i]);
            if (studtioState.data[i].ID === schedule.StudioID) {
                console.log("dapetttt");
                // setType(studio[i].Type);
                return studtioState.data[i].Type;
            }
        }
    }

    const type1 = loopForType();
    // console.log(type1);

    // // loopForType;

    
    const getPrice = () => {
        switch (type1) {
            case "Regular":
                return(50000)
            case "Business":
                return(65000);
            case "VIP":
                return(80000);
            case "VVIP":
                return(100000);
            default:
                return(-1);
        }
    }

    const price1 = getPrice();
    // console.log(price1);




    // console.log(seatCount);

    

    const handleBuyTicket = (e, schedule, selectedSeat) => {
        e.preventDefault();
        
        history("/ticketPayment", {state: {identifier: schedule, selectedSeat: selectedSeat, type: type1, price: price1}})
    }
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

                <button onClick={(e) => handleBuyTicket(e, schedule, selectedSeat)}> Buy Ticket(s) </button>
            </div>
        </div>
    )
}

export default ViewSeat;