import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { db } from "../firebase-config";
import Navbar from "./Navbar";
import "../css/AcceptTerminationLetter.css"
import { useNavigate } from "react-router-dom";


function AcceptFundRequest() {

    const [data, setData] = useState([]);

    const fundRequestRef = collection(db, "FundRequests");

    // let toDisplay = [];

    useEffect(() => {
        const getTerminationLetters = async () => {
            const data = await getDocs(fundRequestRef);
            console.log("status: ", data.Status);
            console.log(data);

            // if (data.Status === "Waiting for Manager Approval") {
                setData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            // }
        }
        getTerminationLetters();
    }, []);

    let history = useNavigate();

    async function  accStatusHandler(e, id){
        // e.preventDefault();
        
        await updateDoc(doc(db, "FundRequests", id), {
            Status: "Approved"
        } )
        // alert("Accept Success");
        // history("/accTerminationLetter");
        window.location = window.location;
    }

    async function  rejStatusHandler(e, id){
        // e.preventDefault();
        console.log("masuk reject");

        await updateDoc(doc(db, "FundRequests", id), {
            Status: "Rejected"
        } )

        console.log("kelar update");
        // alert("Reject Success");
        // history("/accTerminationLetter");
        window.location = window.location;
        
    }

    // data.forEach((e => {
    //     if (e.Status === 'Waiting for Manager Approval'){
    //         toDisplay.push({
    //             EmployeeID: e.EmployeeID,
    //             Name: e.Name,
    //             DateIssued: e.DateIssued,
    //             DateEffective: e.DateEffective,
    //             Status: e.Status
    //         });
    //     }
    // }))

    const columns = [
        {
            name: "ID",
            selector: (row) => row.ID,
            sortable: true,
            width: "70px"
        },
        {
            name: "EmpID",
            selector: (row) => row.EmployeeID,
            sortable: true,
            // width: "70px"
        },
        {
            name: "Name",
            selector: (row) => row.EmployeeName,
            sortable: true,
            width: "200px"
        },
        {
            name: "Department",
            selector: (row) => row.Department,
            width: "130px",
            sortable: true
        },
        {
            name: "RequestDate",
            selector: (row) => row.RequestDate,
            sortable: true,
            width: "100px"
        },
        {
            name: "Amount",
            selector: (row) => row.Amount,
            sortable: true
        },
        {
            name: "Status",
            selector: (row) => row.Status,
            sortable: true,
            width: "190px"
        },
        {
            width: "180px",
            name: "Action",
            cell: (row) =>  {
                console.log(row.Status);
                if (row.Status === "Waiting for Approval") {
                    return (
                        <div className="accOrReject">
                             {/* <form action=""> */}
                                <button className="acc" onClick={(e) => accStatusHandler(e, row.id)}>Accept</button> 
                                <button className="rej" onClick={(e) => rejStatusHandler(e, row.id)}>Reject</button>
                             {/* </form> */}
                      </div>
                    )
                } 
                
            }
            
        }
        //tinggal onclick change status

        // {
        //     cell: (row) => <button>Reject</button>
        // }

    ]

    const ExpandedComponent = (data) => {
        console.log(data.data);

       return (
            <div className="expandInfo">
                <p className="expandP">Reason: {data.data.Reason}</p>
            </div>
       )
    };


    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Update Fund Request</h2>
                <div className="tablee">
                    <DataTable columns={columns} data={data}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}/>
                </div>
            </div>
        </div>
    )

}

export default AcceptFundRequest;