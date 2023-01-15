import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";

const CreateReceipt = () => {
    const location = useLocation();
    const schedule = location.state.schedule;
    const selectedSeat = location.state.selectedSeat;
    const price = location.state.price;
    const payment = location.state.payment;

    const [data, setData] = useState([]);
    const ticketRef = collection(db, "TicketsSold");
    const seatRef = collection(db, "Seats");

    useEffect(() => {
        const getTickets = async () => {
            const data = await getDocs(ticketRef);
            // console.log(data);
            setData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getTickets();
    }, []);

    let temp = false;

    const changeSeatStatus = async (e) => {
        // e.preventDefault();

        for(let i = 0; i<selectedSeat.length; i++) {
            await addDoc(seatRef, {
                ScheduleID: schedule.ScheduleID,
                SeatNumber: selectedSeat[i],
                Status: "Booked"
            })
        }

        
    }

    const createReceipt = async () => {
        // e.preventDefault();

        let biggestID = 0;

        for (let  i = 0; i<data.length; i++) {
            if (data[i].ReceiptID > biggestID) {
                biggestID = data[i].ID;
            }
        }

        await addDoc(ticketRef, {
            ReceiptID: biggestID+1,
            Date: schedule.Date,
            Seat: (selectedSeat.toString()),
            Price: price,
            MovieTitle: schedule.MovieTitle,
            StudioID: schedule.StudioID,
            ScheduleID: schedule.ScheduleID,
            Payment: payment
        })

        changeSeatStatus();
    }

    const viewSelected = () => {

        const selectedElement = [];

        for (let i = 0; i<selectedSeat.length; i++) {
            selectedElement.push(<span>{selectedSeat[i]} &emsp; | &emsp;</span>)
        }
        return (
            selectedElement
        )
    }

    createReceipt();

    const history = useNavigate();

    useEffect(() => {
        if(temp == false) {
            window.print();
            temp = true;
        } else {
            history("/viewTodaysSchedule");
        }
    }, []);

    return (
        
        <div className="bigContainerReceipt">

        <div className="receipt">

                <div className="movieDetails">
                    <div className="movieReceipt">
                         <h3>Movie Title: </h3>
                         <h3>{schedule.MovieTitle}</h3>
                    </div>

                    <div className="movieReceipt">
                        <h3>Studio: </h3>
                        <h3>{schedule.StudioID}</h3>
                    </div>
                    
                    <div className="movieReceipt">
                        <h3>Date: </h3>
                        <h3>{schedule.Date}</h3>
                    </div>
                </div>
                
                <div className="selectedSeatsTicket">
                    <h3>Seat(s): </h3>
                    {viewSelected()}
                </div>

                <div className="totalPrice">
                    <h3>Total price: {price}</h3>
                </div>
                
                <div className="totalPrice">
                    <h3>Payment: {payment}</h3>
                </div>

                {/* <button onClick={createReceipt}>Print Receipt</button> */}
            </div>
        </div>
    )

}

export default CreateReceipt;