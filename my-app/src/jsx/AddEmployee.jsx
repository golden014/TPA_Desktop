import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import {db, auth} from "../firebase-config"
import {collection, getDocs, addDoc} from "firebase/firestore"
import Navbar from "./Navbar"
import "../css/AddEmployee.css"
import {createUserWithEmailAndPassword} from "firebase/auth"


function AddEmployee() {
    // console.log("aaaaa");

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [address, setNewAddress] = useState("");
    const [newPhoneNum, setNewPhoneNum] = useState("");
    const [bankAcc, setBankAcc] = useState("");
    const [role, setNewRole] = useState("");
    const [status, setStatus] = useState("Active");
    const [startWork, setStartWork] = useState(date);
    const [DOB, setDOB] = useState("");
    // const [ID, setID] = useState(0);


    const [employees, setEmployees] = useState([]);

    const empCollectionRef = collection(db, "employee");

    const registUser = async () => {
        

        const user = await createUserWithEmailAndPassword(auth, newEmail, ("sitm" + DOB.slice(8, 10) + DOB.slice(5, 7) + DOB.slice(0, 4)));
        console.log(user);
        console.log("sitm" + DOB.slice(8, 10) + DOB.slice(5, 7) + DOB.slice(0, 4));
    }   

    const createEmployee = async (e) => { 
        e.preventDefault();
        registUser();

        // console.log(DOB);
        // setStatus("Active");
        // setStartWork(currDate.getDate);

        let biggestID = 0;
        console.log("biggest id " + biggestID);

        for (let  i = 0; i<employees.length; i++) {
            if (employees[i].ID > biggestID) {
                biggestID = employees[i].ID;
            }
            console.log("i = " + i + ", id = " + employees[i].ID);
        }

        console.log("biggest id after " + biggestID);

        // setID(biggestID + 1);

        await addDoc(empCollectionRef, {Name: newName, Email: newEmail, PhoneNumber: newPhoneNum, Address: address, BankAccount: bankAcc, Status: status, StartWork: startWork, Role: role, DateOfBirth: DOB, ID: biggestID+1});
        console.log("aaaa");
    }

    useEffect(() => {
        const getEmployees = async () => {
            const data = await getDocs(empCollectionRef);
            // console.log(data);
            setEmployees(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
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
                    Add Employee
                </h2>
                <div className="formClass">
                    <form action="" className="form">
                        <input type="text" placeholder="name" onChange={(event) => {setNewName(event.target.value)}}/>
                        {/* <input type="text" placeholder="role" onChange={(event) => {setNewRole(event.target.value)}}/> */}
                        <select onChange={(event) => {setNewRole(event.target.value)}}>
                            <option value="" selected disabled hidden>role</option>
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
                        <input type="text" placeholder="email" onChange={(event) => {setNewEmail(event.target.value)}}/>
                        <input type="date" onChange={(event) => {setDOB(event.target.value)}}/>
                        <input type="text" placeholder="address" onChange={(event) => {setNewAddress(event.target.value)}}/>
                        <input type="text" placeholder="phoneNumber" onChange={(event) => {setNewPhoneNum(event.target.value)}}/>
                        <input type="text" placeholder="bank account" onChange={(event) => {setBankAcc(event.target.value)}} />

                        <button type="submit" onClick={createEmployee}>Create Employee</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee