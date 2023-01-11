import { useState, useEffect } from "react"
import DataTable, { ExpanderComponentProps }  from "react-data-table-component";
import Navbar from "./Navbar"
import {db} from "../firebase-config"
import {collection, getDocs} from "firebase/firestore"
import "../css/ViewEmployee.css"
import  QRCode from "react-qr-code"



function ViewFacilities() {

    // const ExpandedComponent = ({data}) => {
    //    return (
    //         <div className="expandInfo">
    //             <p className="expandP">Email: {data.Email}</p>
    //             <p className="expandP">Bank Account: {data.BankAccount}</p>
    //             <p className="expandP">Phone Number: {data.PhoneNumber}</p>
    //         </div>
    //    )
    // };

    const [data, setData] = useState([]);
    // const [q, setQ] = useState("");
    const facilitiesRef = collection(db, "Facilities");

    useEffect(() => {
        const getEmployees = async () => {
            const data = await getDocs(facilitiesRef);
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
          name: "EquipmentName",
          selector: (row) => row.EquipmentName,
          sortable: true,
          width: "250px"
        },
        {
            name: "Department",
            selector: (row) => row.Department,
            sortable: true,
            width: "250px"
        },
        {
          name: "DateAdded",
          selector: (row) => row.DateAdded,
          sortable: true,
          width: "150px"
        },
        {
            name: "Condition",
            selector: (row) => row.Condition,
            sortable: true,
        }
    ]

    const ExpandedComponent = (data) => {
        console.log(data.data);

       return (
            <div className="expandInfo">
              <div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}>
                    <QRCode
                    size={500}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={"ID: " + data.data.ID + ", Name: " + data.data.EquipmentName}
                    viewBox={`0 0 256 256`}
                    />
                </div>
            </div>
       )
    };


    return(
        <div className="bigContainer">
            <div className="left">
                <Navbar/>   
            </div>

            <div className="rightt">
                <div className="title2">
                    <h2 className="employeeList">Facility List</h2>
                </div>
                <div className="tablee">
                    <DataTable columns={columns} data={data} 
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    />
                </div>
            </div>
        </div>
    )
}

export default ViewFacilities;