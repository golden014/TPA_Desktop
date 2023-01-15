
import Navbar from "./Navbar"
import { useState, useEffect } from "react"
import {db} from "../firebase-config"
import {addDoc, collection, getDocs} from "firebase/firestore"
import DataTable from "react-data-table-component"
import "../css/WarningLetter.css"


function SubmitResign() {

      // const [issuedDate, setIssuedDate] = useState("");
   
    
    // const [name, setName] = useState("");

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    
    // const [id, setId] = useState(0);
    // const [reason, setReason] = useState("");
    const status = "Waiting for Manager Approval";
    // const [dateEffective, setDateEffective] = useState("");
    const empID = sessionStorage.getItem("ID");
    const empName = sessionStorage.getItem("Name");
    // const [startLeave, setStartLeave] = useState("");
    // const [endLeave, setEndLeave] = useState("");
    const [reason, setReason] = useState("");


    
    const resignationLetterRef = collection(db, "ResignationLetters");

    // const successMessage = "";

    const createResignationLetter = async (e) => {
        e.preventDefault();

        // let biggestID = 0;
        // console.log("biggest id " + biggestID);

        // for (let  i = 0; i<employees.length; i++) {
        //     if (employees[i].ID > biggestID) {
        //         biggestID = employees[i].ID;
        //     }
        //     console.log("i = " + i + ", id = " + employees[i].ID);
        // }
        // const name = getName(id);

        await addDoc(resignationLetterRef, {ID: empID, Name: empName, Reason: reason, Status: status, SubmitDate: date});
        // successMessage = "Success !";
        alert("Success !");
        window.location = window.location;
    }

    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Submit Resignation Letter</h2>
                {/* <div className="tablee">
                    <DataTable columns={columns} data={data} />
                </div> */}

                <form action="" className="formm">
                    {/* <div className="formComponent">
                        <label htmlFor="">Start Leave Date</label> 
                        <input type="date" onChange={(event) => {setStartLeave(event.target.value)}}/>

                    </div>

                    <div className="formComponent">
                        <label htmlFor="">End Leave Date</label> 
                        <input type="date" onChange={(event) => {setEndLeave(event.target.value)}}/>
                    </div> */}

                    <div className="formComponent">
                        <label htmlFor="">Reason</label>
                        <textarea placeholder="Input reason" cols="30" rows="10" onChange={(event) => {setReason(event.target.value)}}></textarea>
                    </div>

                    <div className="formComponent">
                        <button onClick={createResignationLetter}>Submit</button>
                    </div>

                </form>

                {/* <p>{successMessage}</p> */}
            </div>
        </div>
    )
}

export default SubmitResign;