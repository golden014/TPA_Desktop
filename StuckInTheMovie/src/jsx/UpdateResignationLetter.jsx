import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { db } from "../firebase-config";
import Navbar from "./Navbar";
import "../css/AcceptTerminationLetter.css"
import { useNavigate } from "react-router-dom";


function AcceptResignationLetter() {

    const [data, setData] = useState([]);

    const terminationLetterRef = collection(db, "ResignationLetters");

    const [empData, setEmpData] = useState([]);
    const empRef = collection(db, "employee");


    useEffect(() => {
        const getTerminationLetters = async () => {
            const data = await getDocs(empRef);
            console.log("status: ", data.Status);
            console.log(data);

            // if (data.Status === "Waiting for Manager Approval") {
                setEmpData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            // }
        }
        getTerminationLetters();
    }, []);

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
    

    async function  accStatusHandler(e, id, empId){
        // e.preventDefault();
        let idx = "";
        for (let i = 0; i<empData.length; i++) {
            if (empData[i].ID == empId) {
                idx = empData[i].id;
                break;
            }
        }

        console.log(idx);
        
        await updateDoc(doc(db, "ResignationLetters", id), {
            Status: "Approved by Manager"
        } )


        await updateDoc(doc(db, "employee", idx), {
            Status: "Not Active (resigned)"
        })
        // alert("Accept Success");
        // history("/accTerminationLetter");
        window.location = window.location;
    }

    async function  rejStatusHandler(e, id){
        // e.preventDefault();
        console.log("masuk reject");

        await updateDoc(doc(db, "ResignationLetters", id), {
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
            selector: (row) => row.ID,
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
                                <button className="acc" onClick={(e) => accStatusHandler(e, row.id, row.ID)}>Accept</button> 
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
                <h2>Update Resignation Letter</h2>
                <div className="tablee">
                    <DataTable columns={columns} data={data}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}/>
                </div>
            </div>
        </div>
    )

}

export default AcceptResignationLetter;