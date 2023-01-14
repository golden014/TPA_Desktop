import { addDoc, collection, doc, query, updateDoc } from "firebase/firestore";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from "../actions/useSnapCollection";
import { db } from "../firebase-config";
import { useSnapCollection } from "../lib/useSnapCollection";
import Navbar from "./Navbar";


function SubmitDamagedEquipmentReport () {

    //tampilin data equipment yg ada

    const history = useNavigate();
    const [id, setId] = useState(0);
    const [reason, setReason] = useState("");
    // const ExpandedComponent = ({data}) => {
    //    return (
    //         <div className="expandInfo">
    //             <p className="expandP">Email: {data.Email}</p>
    //             <p className="expandP">Bank Account: {data.BankAccount}</p>
    //             <p className="expandP">Phone Number: {data.PhoneNumber}</p>
    //         </div>
    //    )
    // };

    const equipmentState = useSnapCollection(query(collection(db, "Facilities")));
    const equipmentReportState = useSnapCollection(query(collection(db, "DamagedEquipmentReport")));

    if (equipmentState.status === FIRESTORE_FETCH_LOADING) return <div>Loading...</div>
    if (equipmentState.status === FIRESTORE_FETCH_ERROR) return <div>Error: {equipmentState.error}</div>

    if (equipmentReportState.status === FIRESTORE_FETCH_LOADING) return <div>Loading...</div>
    if (equipmentReportState.status === FIRESTORE_FETCH_ERROR) return <div>Error: {equipmentReportState.error}</div>



    // const [data, setData] = useState([]);
    // // const [q, setQ] = useState("");
    // const facilitiesRef = collection(db, "Facilities");

    // useEffect(() => {
    //     const getEmployees = async () => {
    //         const data = await getDocs(facilitiesRef);
    //         // console.log(data);
    //         setData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    //     }

    //     getEmployees();

    // }, []);

   

    // const handlePrint = (e, content) => {
    //     e.preventDefault();

    //     const QRContent = content;
  
    //     history('/print', {state: {identifier: QRContent}});
    // }

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
            width: "200px"
        }
        
    ]

    // const ExpandedComponent = (data) => {
    //     console.log(data.data);

    //    return (
    //         <div className="expandInfo">
    //           <div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}>
    //                 <QRCode
    //                 size={500}
    //                 style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    //                 value={"ID: " + data.data.ID + ", Name: " + data.data.EquipmentName}
    //                 viewBox={`0 0 256 256`}
    //                 />
    //             </div>
    //         </div>
    //    )
    // };

    async function updateStatus(id) {
        await updateDoc(doc(db, "Facilities", id), {
            Condition: "Waiting to be inspected"
        });
    }
    

    const createDamagedReport = async (e) => {
        e.preventDefault();
        const ref = collection(db, "DamagedEquipmentReport");

        let biggestID = 0;

        equipmentReportState.data.forEach(element => {
            if(element.ID > biggestID) {
                biggestID = element.ID;
            }
        });

        let name = "";
        let foundId = "";
        console.log("sblm foreach: " + name);
        console.log(id);
        equipmentState.data.forEach(element => {
            console.log(element);
            console.log(element.ID);
            if (element.ID == id) {
                console.log("ketemu");
                name = element.EquipmentName;
               foundId = element.id;
            }
        });
        console.log("setelah foreach: " + name);

        await addDoc(ref, {
            ID: biggestID+1,
            SubmittedBy: sessionStorage.getItem("Name"),
            EmployeeID: sessionStorage.getItem("ID"),
            Details: reason,
            EquipmentID: id,
            EquipmentName: name,
            ReportStatus: "Pending",
            UpdateDetails: ""
        });

        updateStatus(foundId);

        alert("Success !");
        window.location = window.location;
    }

    return(
        <div className="bigContainer">
            <div className="left">
                <Navbar/>   
            </div>

            <div className="right">
                <div className="title2">
                    <h2 className="employeeList">Facility List</h2>
                </div>
                <div className="tablee">
                    <DataTable columns={columns} data={equipmentState.data} 
                    />
                </div>

                <form action="" className="formm">
                    <div className="formComponent">
                        <label htmlFor="">ID</label> 
                        <input type="text" placeholder="Input Equipment/Facility ID" onChange={(event) => {setId(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Problem Details</label>
                        <textarea placeholder="Input details" cols="30" rows="10" onChange={(event) => {setReason(event.target.value)}}></textarea>
                    </div>

        

                    <div className="formComponent">
                        <button onClick={(e) => createDamagedReport(e)}>Submit</button>
                    </div>

                </form>

            </div>
        </div>
    )

}
export default SubmitDamagedEquipmentReport;