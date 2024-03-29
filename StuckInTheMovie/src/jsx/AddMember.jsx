import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import {db, auth} from "../firebase-config"
import {collection, getDocs, addDoc} from "firebase/firestore"
import Navbar from "./Navbar"
import "../css/AddEmployee.css"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom"


function AddMember() {
    // console.log("aaaaa");

    
    // const addedDate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    // const [newName, setNewName] = useState("");
    // const [type, setType] = useState("");
    // const [department, setDepartment] = useState("");
    // const condition = "Good";

    // const [newPhoneNum, setNewPhoneNum] = useState("");
    // const [bankAcc, setBankAcc] = useState("");
    // const [role, setNewRole] = useState("");
    // const [status, setStatus] = useState("Active");
    // const [startWork, setStartWork] = useState(date);
    // const [DOB, setDOB] = useState("");
    // const [ID, setID] = useState(0);


    const [facilities, setFacilities] = useState([]);

    const facilitiesRef = collection(db, "Members");

    
    const [memberName, setMemberName] = useState("");
    const current = new Date();
    const currDate = current.toLocaleDateString("en-CA");
    const membershipType = "Silver";
    const points = 0;
    const history = useNavigate();

    const beforeCreateFacilities = async (e) => {
        e.preventDefault();
        let biggestID = 0;

        for (let  i = 0; i<facilities.length; i++) {
            if (facilities[i].ID > biggestID) {
                biggestID = facilities[i].ID;
            }
        }

        createFacilities(biggestID);
    }

    const createFacilities = async (biggestID) => { 
       

        // console.log(DOB);
        // setStatus("Active");
        // setStartWork(currDate.getDate);

     
        // console.log("biggest id " + biggestID);

        

        // console.log("biggest id after " + biggestID);

        // setID(biggestID + 1);

        await addDoc(facilitiesRef, {ID: biggestID + 1, MemberName: memberName, DateJoin: currDate, MemberType: membershipType, Points: points});
       
        history("/createMemberCard", {state: {
            ID: (biggestID + 1),
            Name: memberName,
            DateJoin: currDate,
            MemberType: membershipType 
        }});

        // alert("Success");
        // window.location = window.location;

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
                <h2 className="">
                    Add New Member
                </h2>

                <form action="" className="formm">
                    <div className="formComponent">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Input Name" onChange={(e) => {setMemberName(e.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <button onClick={beforeCreateFacilities}>Add New Member</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddMember;