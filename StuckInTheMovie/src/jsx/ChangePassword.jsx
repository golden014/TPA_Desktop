import { useState, useEffect } from "react"
import DataTable, { ExpanderComponentProps }  from "react-data-table-component";
import Navbar from "./Navbar"
import {db} from "../firebase-config"
import {collection, getDocs} from "firebase/firestore"
import "../css/ViewEmployee.css"
import { getAuth, sendPasswordResetEmail } from "firebase/auth";



function ChangePassword() {

    const ExpandedComponent = ({data}) => {
       return (
            <div className="expandInfo">
                <p className="expandP">Email: {data.Email}</p>
                <p className="expandP">Bank Account: {data.BankAccount}</p>
                <p className="expandP">Phone Number: {data.PhoneNumber}</p>
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

    function  accStatusHandler(e, email){
        e.preventDefault();
        const auth = getAuth();
        console.log(email);

        sendPasswordResetEmail(auth, email)
        .then(() => {
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            // alert(errorMessage);
            // ..
          });
     
        // history("/accTerminationLetter");
        alert("Success");

        window.location = window.location;
    }

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
        {
            width: "220px",
            name: "Action",
            cell: (row) =>  {
                return (
                    <div className="accOrReject">
                            <button className="acc" onClick={(e) => accStatusHandler(e, row.Email)}>Send Password Reset Email</button> 
                    </div>
                )
            }
            
        }
        
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

export default ChangePassword;