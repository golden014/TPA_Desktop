
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase-config";
import Navbar from "./Navbar";


const TicketPayment = () => {

    const location = useLocation();
    const schedule = location.state.identifier;
    //nomor seat yg di select
    const selectedSeat = location.state.selectedSeat;
    const typee = location.state.type;
    const pricee = location.state.price;

    console.log(typee);
    console.log(pricee);

    //cari tau dulu type dari studio nya (regular, business dll)
    const [data, setData] = useState([]);
    const personalLeaveRef = collection(db, "Studios");
    
    useEffect(() => {
        const getTerminationLetters = async () => {
            const data = await getDocs(personalLeaveRef);

            // if (data.Status === "Waiting for Manager Approval") {
                setData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
                Object.freeze(data);
                console.log(data);

        }
        getTerminationLetters();
       
        // const loopForType = async () => {
        //     console.log("masuk loop for type");
        //     console.log(data);
        //     for (let i = 0; i<data.length; i++) {
        //         console.log("i = " + i);
        //         console.log( data[i]);
        //         if (data[i].ID == schedule.StudioID) {
        //             console.log("dapetttt");
        //             setType(data[i].Type);
        //             break;
        //         }
        //     }
        // }
        // loopForType();
        // // Object.freeze(type);
        // console.log(type)

        // const getType = async () => {
        //     switch (type) {
        //         case "Regular":
        //             setPrice(50000);
        //             break;
        //         case "Business":
        //             setPrice(65000);
        //             break;
        //         case "VIP":
        //             setPrice(80000);
        //             break;
        //         case "VVIP":
        //             setPrice(100000);
        //             break;
        //     }
        // }
        // getType();

       
        // // Object.freeze(price);
        // console.log(price);
        
    }, []);

    const [type, setType] = useState("");

    
    // console.log(data);
    // useEffect(() => {
       
        
    // // }
    // }, [])
    // console.log(type);

   
    
    const [price, setPrice] = useState(0);

    // useEffect(() => {
       
    // }, []);

    

    const [payment, setPayment] = useState("");

    const viewSelected = () => {

        const selectedElement = [];

        for (let i = 0; i<selectedSeat.length; i++) {
            selectedElement.push(<span>{selectedSeat[i]} &emsp; | &emsp;</span>)
        }
        return (
            selectedElement
        )
    }

    // console.log(selectedSeat);
    // console.log(type);
    return(
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Payment</h2>

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
                    <h3>Selected seat: </h3>
                    {viewSelected()}
                </div>

                <div className="totalPrice">
                    <span>Total price: {selectedSeat.length} x {pricee} = </span>
                    <h3>{selectedSeat.length * pricee}</h3>
                </div>
                
                <select onChange={(e) => {setPayment(e.target.value)}}>
                    <option value="" selected disabled hidden>Select Payment</option>
                    <option value="GoPei"> GoPei </option>
                    <option value="oWo"> oWo </option>
                    <option value="sopiPey"> Sopi Pey </option>
                    <option value="cash"> Cash </option>
                </select>
            </div>
        </div>
    )
}

export default TicketPayment;