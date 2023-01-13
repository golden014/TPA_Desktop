import { useState, useEffect } from "react"
import DataTable, { ExpanderComponentProps }  from "react-data-table-component";
import Navbar from "./Navbar"
import {db} from "../firebase-config"
import {collection, getDocs} from "firebase/firestore"
import "../css/ViewEmployee.css"



function ViewEmployee() {

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