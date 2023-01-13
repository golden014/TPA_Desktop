import Navbar from "./Navbar"
import { useState, useEffect } from "react"
import {db} from "../firebase-config"
import {addDoc, collection, getDocs} from "firebase/firestore"
import DataTable from "react-data-table-component"
import "../css/WarningLetter.css"


function AddStudio() {

      // const [issuedDate, setIssuedDate] = useState("");
   
    
    // const [name, setName] = useState("");

    
    // const [id, setId] = useState(0);
    // const [reason, setReason] = useState("");
    // const [dateEffective, setDateEffective] = useState("");


    
    const studioRef = collection(db, "Studios");
    const [studio, setStudio] = useState([]);

    // const successMessage = "";

    useEffect(() => {
        const getEmployees = async () => {
            const data = await getDocs(studioRef);
            // console.log(data);
            setStudio(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getEmployees();
    }, []);

    const createStudio = async (e) => {
        e.preventDefault();

        let biggestID = 0;
        // console.log("biggest id " + biggestID);

        for (let  i = 0; i<studio.length; i++) {
            if (studio[i].ID > biggestID) {
                biggestID = studio[i].ID;
            }
            console.log("i = " + i + ", id = " + studio[i].ID);
        }

        await addDoc(studioRef, {ID: biggestID+1, Type: type, SeatCount: seat, Status: "Available"});
        // successMessage = "Success !";
        alert("Success !");
        window.location = window.location;
    }

    const [seat, setSeat] = useState(0);
    const [type, setType] = useState("");


    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Add New Studio</h2>
                {/* <div className="tablee">
                    <DataTable columns={columns} data={data} />
                </div> */}

                <form action="" className="formm">
                    <div className="formComponent">
                        <label htmlFor="">Seat Count</label> 
                        <input type="number" onChange={(event) => {setSeat(event.target.value)}}/>

                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Studio Type</label> 
                        <select onChange={(event) => {setType(event.target.value)}}>
                            <option value="" selected disabled hidden>choose studio type</option>
                            <option value="Regular">Regular</option>
                            <option value="Business">Business</option>
                            <option value="VIP">VIP</option>
                            <option value="VVIP">VVIP</option>
                        </select>
                    </div>

                    <div className="formComponent">
                        <button onClick={createStudio}>Add Studio</button>
                    </div>

                </form>

                {/* <p>{successMessage}</p> */}
            </div>
        </div>
    )
}

export default AddStudio;