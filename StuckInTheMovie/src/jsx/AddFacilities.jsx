import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import {db, auth} from "../firebase-config"
import {collection, getDocs, addDoc} from "firebase/firestore"
import Navbar from "./Navbar"
import "../css/AddEmployee.css"
import {createUserWithEmailAndPassword} from "firebase/auth"


function AddFacilities() {
    // console.log("aaaaa");

    const current = new Date();
    const addedDate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    const [newName, setNewName] = useState("");
    const [type, setType] = useState("");
    const [department, setDepartment] = useState("");
    const condition = "Good";

    // const [newPhoneNum, setNewPhoneNum] = useState("");
    // const [bankAcc, setBankAcc] = useState("");
    // const [role, setNewRole] = useState("");
    // const [status, setStatus] = useState("Active");
    // const [startWork, setStartWork] = useState(date);
    // const [DOB, setDOB] = useState("");
    // const [ID, setID] = useState(0);


    const [facilities, setFacilities] = useState([]);

    const facilitiesRef = collection(db, "Facilities");


    const createFacilities = async (e) => { 
        e.preventDefault();

        // console.log(DOB);
        // setStatus("Active");
        // setStartWork(currDate.getDate);

        let biggestID = 0;
        console.log("biggest id " + biggestID);

        for (let  i = 0; i<facilities.length; i++) {
            if (facilities[i].ID > biggestID) {
                biggestID = facilities[i].ID;
            }
            console.log("i = " + i + ", id = " + facilities[i].ID);
        }

        console.log("biggest id after " + biggestID);

        // setID(biggestID + 1);

        await addDoc(facilitiesRef, {EquipmentName: newName, Department: department, DateAdded: addedDate, Condition: condition, ID: biggestID + 1});
       
       alert("Success");
    console.log("aaaa");
    }

    useEffect(() => {
        const getEmployees = async () => {
            const data = await getDocs(facilitiesRef);
            // console.log(data);
            setFacilities(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
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
                    Add New Facility
                </h2>
                <div className="formClass">
                    <form action="" className="form">
                        <input type="text" placeholder="Equipment Name" onChange={(event) => {setNewName(event.target.value)}}/>
                        {/* <input type="text" placeholder="Equipment Type" onChange={(event) => {setType(event.target.value)}}/>                         */}
                        <select onChange={(event) => {setDepartment(event.target.value)}}>
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

                        </select>

                        <button type="" onClick={createFacilities}>Add Facility</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddFacilities;