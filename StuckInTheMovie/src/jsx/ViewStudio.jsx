import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { db } from "../firebase-config";
import Navbar from "./Navbar";
import "../css/AcceptTerminationLetter.css"
import { useNavigate } from "react-router-dom";


function ViewStudio() {

    const [data, setData] = useState([]);

    const personalLeaveRef = collection(db, "Studios");

    let toDisplay = [];

    useEffect(() => {
        const getTerminationLetters = async () => {
            const data = await getDocs(personalLeaveRef);
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
        

        await updateDoc(doc(db, "Studios", id), {
            Status: "Available"
        } )
        // alert("Accept Success");
        // history("/accTerminationLetter");
        window.location = window.location;
    }

    async function  rejStatusHandler(e, id){
        // e.preventDefault();
        console.log("masuk reject");

        await updateDoc(doc(db, "Studios", id), {
            Status: "Not Available"
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
            name: "Studio ID",
            selector: (row) => row.ID,
            sortable: true,
            // width: "70px"
        },
        {
            name: "Seat Count",
            selector: (row) => row.SeatCount,
            sortable: true,
            width: "200px"
        },
        {
            name: "Type",
            selector: (row) => row.Type,
            sortable: true,
            width: "100px"
        },
        {
            name: "Status",
            selector: (row) => row.Status,
            sortable: true,
            width: "250px"
        },
        {
            width: "220px",
            name: "Change Status",
            cell: (row) =>  {
                console.log(row.Status);
                return (
                    <div className="accOrReject">
                            {/* <form action=""> */}
                            <button className="" onClick={(e) => accStatusHandler(e, row.id)}>Available</button> 
                            <button className="" onClick={(e) => rejStatusHandler(e, row.id)}>Not Available</button>
                            {/* </form> */}
                        
                    </div>
                )

                
            }
            
        }
        //tinggal onclick change status

        // {
        //     cell: (row) => <button>Reject</button>
        // }

    ]

    // const ExpandedComponent = (data) => {
    //     console.log(data.data);

    //    return (
    //         <div className="expandInfo">
    //             <p className="expandP">Reason: {data.data.Reason}</p>
    //         </div>
    //    )
    // };


    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Studio List</h2>
                <div className="tablee">
                    <DataTable columns={columns} data={data}
                  />
                </div>
            </div>
        </div>
    )

}

export default ViewStudio;