import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import {db} from "../firebase-config"
import {collection, getDocs, addDoc} from "firebase/firestore"
import Navbar from "./Navbar"

function TesCrud() {
    // console.log("aaaaa");

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [address, setNewAddress] = useState("");
    const [newPhoneNum, setNewPhoneNum] = useState("");
    const [bankAcc, setBankAcc] = useState("");
    const [role, setNewRole] = useState("");
    const [status, setStatus] = useState("Active");
    const [startWork, setStartWork] = useState(date);

    const [employees, setEmployees] = useState([]);

    const empCollectionRef = collection(db, "employee");

    const createEmployee = async (e) => { 
        e.preventDefault();


        // setStatus("Active");
        // setStartWork(currDate.getDate);
        await addDoc(empCollectionRef, {Name: newName, Email: newEmail, PhoneNumber: newPhoneNum, Address: address, BankAccount: bankAcc, Status: status, StartWork: startWork, Role: role});
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
        <div>
            <Navbar/>
            <form action="" >
                <input type="text" placeholder="name" onChange={(event) => {setNewName(event.target.value)}}/>
                <input type="text" placeholder="role" onChange={(event) => {setNewRole(event.target.value)}}/>
                <input type="text" placeholder="email" onChange={(event) => {setNewEmail(event.target.value)}}/>
                <input type="text" placeholder="address" onChange={(event) => {setNewAddress(event.target.value)}}/>
                <input type="text" placeholder="phoneNumber" onChange={(event) => {setNewPhoneNum(event.target.value)}}/>
                <input type="text" placeholder="bank account" onChange={(event) => {setBankAcc(event.target.value)}} />

                <button type="submit" onClick={createEmployee}>Create User</button>
            </form>

            {/* {
                employees.map((employee) => { return (
                <div key={employee.id}>
                    <h1>Name: {employee.Name}</h1>
                    <h1>EmployeeID: {employee.id}</h1>
                    <h1>Email: {employee.Email}</h1>
                    <h1>PhoneNumber: {employee.PhoneNumber}</h1>
                </div>
                )})
            } */}
        </div>
    )
}

export default TesCrud