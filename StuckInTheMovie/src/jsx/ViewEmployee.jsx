import { useState, useEffect } from "react"
import DataTable, { ExpanderComponentProps }  from "react-data-table-component";
import Navbar from "./Navbar"
import {db} from "../firebase-config"
import {collection, getDocs} from "firebase/firestore"
import "../css/ViewEmployee.css"



function ViewEmployee() {

    const warningLetterRef = collection(db, "WarningLetters");
    const [warnLetters, setWarnLetters] = useState([]);

    const personalLeaveRef = collection(db, "PersonalLeaveRequest");
    const [personalLeave, setPersonalLeave] = useState([]);

    const workingTimeRef = collection(db, "WorkingShifts");
    const [workingTime, setWorkTime] = useState([]);

    useEffect(() => {
        const getWarns = async () => {
            const data = await getDocs(workingTimeRef);
            // console.log(data);
            setWorkTime(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getWarns();

    }, []);


    useEffect(() => {
        const getWarn = async () => {
            const data = await getDocs(warningLetterRef);
            // console.log(data);
            setWarnLetters(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getWarn();

    }, []);

    useEffect(() => {
        const getWarnn = async () => {
            const data = await getDocs(personalLeaveRef);
            // console.log(data);
            setPersonalLeave(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getWarnn();

    }, []);

    const ListWarningLetter = (id) => {
        // console.log(warnLetters);
        // console.log(warnLetters.length);
        const list = [];

        for (let i = 0; i<warnLetters.length; i++) {
            if(warnLetters[i].EmployeeID == id) {
                // console.log("ketemu");
                if (warnLetters[i].Status === "Approved by Manager") {
                    list.push(
                        <p className="expandP">{warnLetters[i].DateIssued} - {warnLetters[i].Reason}</p>
                    )
                }
            }
        }

        return (list)
    }

    const ListPersonalLeave = (id) => {
        console.log(personalLeave);
        console.log(personalLeave.length);
        const list1 = [];

        for (let i = 0; i<personalLeave.length; i++) {
            if(personalLeave[i].ID == id) {
                console.log("ketemu warnLetter");
                if (personalLeave[i].Status === "Approved") {
                    list1.push(
                        <p className="expandP">{personalLeave[i].StartLeaveDate} to {personalLeave[i].EndLeaveDate} {personalLeave[i].Reason}</p>
                    )
                }
            }
        }

        return (list1)
    }

    const ListWorkTime = (id) => {
        // console.log(warnLetters);
        // console.log(warnLetters.length);
        const list = [];

        for (let i = 0; i<workingTime.length; i++) {
            if(workingTime[i].EmployeeID == id) {
                // console.log("ketemu");
                list.push(
                    <div>
                        <p className="expandP">Monday: {workingTime[i].Monday}</p>
                        <p className="expandP">Tuesday: {workingTime[i].Tuesday}</p>
                        <p className="expandP">Wednesday: {workingTime[i].Wednesday}</p>
                        <p className="expandP">Thursday: {workingTime[i].Thursday}</p>
                        <p className="expandP">Friday: {workingTime[i].Friday}</p>
                        <p className="expandP">Saturday: {workingTime[i].Saturday}</p>
                        <p className="expandP">Monday: {workingTime[i].Monday}</p>
                     </div>
                )
                break;
            }
        }

        return (list);
    }

    

    const ExpandedComponent = ({data}) => {
       return (
            <div className="expandInfo">
                <p className="expandP">Employee personal information</p>
                <p className="expandP">Phone Number: {data.PhoneNumber}</p>
                <p className="expandP">Address: {data.Address}</p>
                <p className="expandP">Bank Account: {data.BankAccount}</p>
                <p className="expandP">Salary: {data.Salary}</p>
                <br />
                <p className="expandP">Warning Letter(s): </p>
                {ListWarningLetter(data.ID)}
                <br />
                <p className="expandP">Personal Leave(s): </p>
                {ListPersonalLeave(data.ID)}
                <br />
                <p className="expandP">Working Time: </p>
                {ListWorkTime(data.ID)}
            </div>
       )
    };

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

    const columns = [

        {
            name: "ID",
            selector: (row) => row.ID,
            sortable: true
        },
        {
          name: "Name",
          selector: (row) => row.Name,
          sortable: true,
          width: "250px"
        },
        {
            name: "Role",
            selector: (row) => row.Role,
            sortable: true,
        },
        {
          name: "Email",
          selector: (row) => row.Email,
          width: "200px",
          sortable: true,
        },
        {
          name: "StartWork",
          selector: (row) => row.StartWork,
          sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.Status,
            sortable: true,
        },
        
    ]

    return(
        <div className="bigContainer">
            <div className="left">
                <Navbar/>   
            </div>

            <div className="right">
                <div className="title2">
                    <h2 className="employeeList">Employee List</h2>
                </div>
                <div className="tablee">
                    <DataTable columns={columns} data={data} 
                    expandableRows
                    expandableRowsComponent = {ExpandedComponent} />
                </div>
            </div>
        </div>
    )
}

export default ViewEmployee