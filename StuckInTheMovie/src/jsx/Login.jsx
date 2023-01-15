import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"
import { db, auth } from "../firebase-config"
import currUser from "./currUser"
import {collection, getDocs} from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import "../css/Login.css"


export const user = auth;

function Login() {

    let history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [data, setData] = useState([]);
    // const [q, setQ] = useState("");
    const empCollectionRef = collection(db, "employee");

    useEffect(() => {
        const getEmployees = async () => {
            const data = await getDocs(empCollectionRef);
            // console.log(data);
            setData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getEmployees();


    }, []);

   const curr = new currUser();

    const verify = (e) => {
        e.preventDefault();

        // console.log(typeof data);

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setErrorMsg("Success");
            // const user = userCredential.user;
            console.log(user);
            console.log(userCredential);
            console.log(data);

            let i = 0;

            for (i = 0; i<data.length; i++) {
                // console.log("loop " + i);
                // console.log(data[i].Email);
                // console.log(data[i].Name);
                // console.log("-----");
                if (data[i].Email == email) {
                    break;
                    // found = i;
                    // console.log(data.Email);
                    // console.log(data.Name);
                    
                }

            }
            
            sessionStorage.setItem("ID", data[i].ID);
            sessionStorage.setItem("Email", email);
            sessionStorage.setItem("Role", data[i].Role);
            sessionStorage.setItem("Name", data[i].Name);
            sessionStorage.setItem("Address", data[i].Address);
            sessionStorage.setItem("BankAccount", data[i].BankAccount);
            sessionStorage.setItem("DOB", data[i].DateOfBirth);
            sessionStorage.setItem("PhoneNumber", data[i].PhoneNumber);
            sessionStorage.setItem("Status", data[i].Status);

            // curr.setEmail(email);
            // curr.setRole(data[i].Role);
            // curr.setName(data[i].Name);
            // curr.setAddress(data[i].Address);
            // curr.setBankAcc(data[i].BankAccount);
            // curr.setDOB(data[i].DateOfBirth);
            // curr.setPhoneNum(data[i].PhoneNumber);
            // curr.setStartWork(data[i].StartWork);
            // curr.setStatus(data[i].Status);
            console.log(sessionStorage.getItem("Role"));
            history("/default");

            
            // password
            
        })
        .catch((error) => {
            setErrorMsg("Wrong Credential !");
            console.log(user);
            console.log(error);
        });
    }

    

    return (
        <div className="mainContainerr">
            <h2>Stuck in the Movie</h2>

            <form action="" className="form2">
                <input type="text" placeholder="Email" onChange={(event) => {setEmail(event.target.value)}}/>
                <input type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}/>
                <button type="submit" onClick={verify}> Login </button>
            </form>
            
            <h2> {errorMsg} </h2>
        </div>
    )
}

export default Login;