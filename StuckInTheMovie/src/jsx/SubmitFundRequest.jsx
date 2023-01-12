import { addDoc, collection, getDocs} from "firebase/firestore";
import { useState, useEffect } from "react";
import Navbar from "./Navbar"
import { db } from "../firebase-config";


function SubmitFundRequest() {

    const empID = sessionStorage.getItem("ID");
    const empName = sessionStorage.getItem("Name");

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    const [amount, setAmount] = useState(0);
    const [reason, setReason] = useState("");
    const status = "Waiting for Approval";
    // const [role, setNewRole] = useState("");
    const role = sessionStorage.getItem("Role");

    const fundRequestRef = collection(db, "FundRequests");
    const [fundRequests, setFundRequests] = useState([]);

    const createFundRequest = async (e) => {
        (e).preventDefault();

        let biggestID = 0;
        console.log("biggest id " + biggestID);

        for (let  i = 0; i<fundRequests.length; i++) {
            if (fundRequests[i].ID > biggestID) {
                biggestID = fundRequests[i].ID;
            }
            console.log("i = " + i + ", id = " + fundRequests[i].ID);
        }

        console.log("biggest id after " + biggestID);


        await addDoc(fundRequestRef, {ID: biggestID + 1,EmployeeID: empID, RequestDate: date, Amount: amount, Reason: reason, Status: status, Department: role, EmployeeName: empName})
        alert("Success");
        // window.location = window.location
    }

    useEffect(() => {
        const getEmployees = async () => {
            const data = await getDocs(fundRequestRef);
            // console.log(data);
            setFundRequests(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getEmployees();


    }, []);

    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2 className="addEmployee">
                    Submit Fund Request
                </h2>

                <div className="formClass">
                    <form action="" className="form">
                        {/* <select onChange={(event) => {setNewRole(event.target.value)}}>
                                <option value="" selected disabled hidden>Department</option>
                                <option value="Manager">Manager</option>
                                <option value="Human Resource Dept">Human Resource Dept</option>
                                <option value="Storage Dept">Storage Dept</option>
                                <option value="External Dept">External Dept</option>
                                <option value="Admin">Admin</option>
                                <option value="Schedule Division Movie Dept">Schedule Division Movie Dept</option>
                                <option value="Front Office Division Movie Dept">Front Office Division Movie Dept</option>
                                <option value="Operation Division Movie Dept">Operation Division Movie Dept</option>
                                <option value="Finance Dept">Finance Dept</option>
                                <option value="Promotion and Event Dept">Promotion and Event Dept</option>
                                <option value="Front Office Division Cafe Dept">Front Office Division Cafe Dept</option>
                                <option value="Kitchen Division Cafe Dept">Kitchen Division Cafe Dept</option>

                            </select> */}
                            <input type="number" onChange={(e) => setAmount(e.target.value)} placeholder="Amount"/>
                            <textarea placeholder="Input details" cols="30" rows="10" onChange={(event) => {setReason(event.target.value)}}></textarea>
                            <button onClick={createFundRequest}>Submit</button>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default SubmitFundRequest;

//gimana caranya connect database ke program c++


