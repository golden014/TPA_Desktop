import { useState, useEffect } from "react"
import DataTable, { ExpanderComponentProps }  from "react-data-table-component";
import Navbar from "./Navbar"
import {db} from "../firebase-config"
import {collection, getDocs} from "firebase/firestore"
import "../css/ViewEmployee.css"
import  QRCode from "react-qr-code"
import { useNavigate } from "react-router-dom";



function ViewAllMember() {

    // const ExpandedComponent = ({data}) => {
    //    return (
    //         <div className="expandInfo">
    //             <p className="expandP">Email: {data.Email}</p>
    //             <p className="expandP">Bank Account: {data.BankAccount}</p>
    //             <p className="expandP">Phone Number: {data.PhoneNumber}</p>
    //         </div>
    //    )
    // };
    const history = useNavigate();

    const handlePrint = (e, content) => {
        e.preventDefault();

        const QRContent = content;
  
        history('/print', {state: {identifier: QRContent}});
    }

    const [data, setData] = useState([]);
    // const [q, setQ] = useState("");
    const facilitiesRef = collection(db, "Members");

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
          name: "Member Name",
          selector: (row) => row.MemberName,
          sortable: true,
          width: "250px"
        },
        {
            name: "Member Type",
            selector: (row) => row.MemberType,
            sortable: true,
            width: "250px"
        },
        {
          name: "Points",
          selector: (row) => row.Points,
          sortable: true,
          width: "150px"
        },
        {
            name: "Date Join",
            selector: (row) => row.DateJoin,
            sortable: true,
        },
        {
            width: "220px",
            name: "Action",
            cell: (row) =>  {
                return (
                    <div className="accOrReject">
                            <button className="rej" onClick={(e) => handlePrint(e, ("MemberID: " + row.ID + ", Name: " + row.MemberName))}>Print QR</button>
                    </div>
                )
          
                
            }
            
        }
    ]

    const ExpandedComponent = (data) => {
        console.log(data.data);

       return (
            <div className="expandInfo">
              <div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}>
                    <QRCode
                    size={200}
                    style={{ height: "100px", maxWidth: "100%", width: "100%" }}
                    value={"MemberID: " + data.data.ID + ", Name: " + data.data.MemberName}
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

            <div className="right">
                <div className="title2">
                    <h2 className="employeeList">Member List</h2>
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

export default ViewAllMember;