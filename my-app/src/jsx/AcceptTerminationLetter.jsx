import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { db } from "../firebase-config";
import Navbar from "./Navbar";
import "../css/AcceptTerminationLetter.css"
import { useNavigate } from "react-router-dom";


function AcceptTerminationLetter() {

    const [data, setData] = useState([]);

    const terminationLetterRef = collection(db, "TerminationLetters");

    let toDisplay = [];

    useEffect(() => {
        const getTerminationLetters = async () => {
            const data = await getDocs(terminationLetterRef);
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
        
        await updateDoc(doc(db, "TerminationLetters", id), {
            Status: "Approved by Manager"
        } )
        // alert("Accept Success");
        // history("/accTerminationLetter");
        window.location = window.location;
    }

    async function  rejStatusHandler(e, id){
        // e.preventDefault();
        console.log("masuk reject");

        await updateDoc(doc(db, "TerminationLetters", id), {
            Status: "Rejected by Manager"
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
            name: "EmpID",
            selector: (row) => row.EmployeeID,
            sortable: true,
            // width: "70px"
        },
        {
            name: "Name",
            selector: (row) => row.Name,
            sortable: true,
            width: "200px"
        },
        {
            name: "IssuedByHRD",
            selector: (row) => row.DateIssued,
            sortable: true,
            width: "100px"
        },
        {
            name: "DateEffective",
            selector: (row) => row.DateEffective,
            sortable: true
        },
        {
            name: "Status",
            selector: (row) => row.Status,
            sortable: true,
            width: "250px"
        },
        {
            width: "220px",
            name: "Action",
            cell: (row) =>  {
                console.log(row.Status);
                if (row.Status === "Waiting for Manager Approval") {
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
                <p className="expandP">Details: {data.data.Details}</p>
            </div>
       )
    };


    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Update Termination Letter</h2>
                <div className="tablee">
                    <DataTable columns={columns} data={data}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}/>
                </div>
            </div>
        </div>
    )

}

export default AcceptTerminationLetter;