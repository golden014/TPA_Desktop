import { addDoc, collection, doc, query, updateDoc } from "firebase/firestore";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from "../actions/useSnapCollection";
import { db } from "../firebase-config";
import { useSnapCollection } from "../lib/useSnapCollection";
import Navbar from "./Navbar";



function UpdateDamagedEquipmentReport() {

     //tampilin data equipment yg ada

     const history = useNavigate();
     const [id, setId] = useState(0);
     const [reason, setReason] = useState("");
     const [newCondition, setNewCondition] = useState("");
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
        //  {
        //     name: "EquipmentID",
        //     selector: (row) => row.EquipmentID,
        //     sortable: true,
        //     width: "250px"
        //   },
         {
           name: "EquipmentName",
           selector: (row) => row.EquipmentName,
           sortable: true,
           width: "250px"
         },
         {
             name: "Submitted by",
             selector: (row) => row.SubmittedBy,
             sortable: true,
             width: "250px"
         },
         {
           name: "Status",
           selector: (row) => row.ReportStatus,
           sortable: true,
           width: "150px"
         }
         
     ]
 
     const ExpandedComponent = (data) => {
         console.log(data.data);
 
        return (
             <div className="expandInfo">
              <p>Problem Details: {data.Details}</p>
              <p>Inspect Details: {data.UpdateDetails}</p>
             </div>
        )
     };
 
     async function updateStatus(id) {
         await updateDoc(doc(db, "Facilities", id), {
             Condition: "Waiting to be inspected"
         });
     }
     
     async function updateReport(e) {

        e.preventDefault();

        let idToUpdate;
        let equipmentIdManual;
        let idToUpdateFacility;

        for (let i = 0; i<equipmentReportState.data.length; i++) {
            // console.log(equipmentReportState.data[i].ID);
            // console.log(id);
            // console.log("---------------");
            // console.log(equipmentReportState.data[i].ID == id);
            if (equipmentReportState.data[i].ID == id) {
                idToUpdate = equipmentReportState.data[i].id;
                equipmentIdManual = equipmentReportState.data[i].EquipmentID;
                break;
            }
        }
        
        // console.log("id to update report: " + idToUpdate);
        await updateDoc(doc(db, "DamagedEquipmentReport", idToUpdate), {
            ReportStatus: "Done",
            UpdateDetails: reason
        });

        console.log(equipmentIdManual);
        for (let i = 0; i<equipmentState.data.length; i++) {
            //ganti facility yg di report punya condition dengan new condition
            if (equipmentState.data[i].ID == equipmentIdManual) {
                idToUpdateFacility = equipmentState.data[i].id;
                break;
            }
        } 
        

        await updateDoc(doc(db, "Facilities", idToUpdateFacility), {
            Condition: newCondition
        })

        alert("Success");
        window.location = window.location;
     }
 
    //  const createDamagedReport = async (e) => {
    //      e.preventDefault();
    //      const ref = collection(db, "DamagedEquipmentReport");
 
    //      let biggestID = 0;
 
    //      equipmentReportState.data.forEach(element => {
    //          if(element.ID > biggestID) {
    //              biggestID = element.ID;
    //          }
    //      });
 
    //      let name = "";
    //      let foundId = "";
    //      console.log("sblm foreach: " + name);
    //      console.log(id);
    //      equipmentState.data.forEach(element => {
    //          console.log(element);
    //          console.log(element.ID);
    //          if (element.ID == id) {
    //              console.log("ketemu");
    //              name = element.EquipmentName;
    //             foundId = element.id;
    //          }
    //      });
    //      console.log("setelah foreach: " + name);
 
    //      await addDoc(ref, {
    //          ID: biggestID+1,
    //          SubmittedBy: sessionStorage.getItem("Name"),
    //          Details: reason,
    //          EquipmentID: id,
    //          EquipmentName: name,
    //          ReportStatus: "Pending"
    //      });
 
    //      updateStatus(foundId);
 
    //      alert("Success !");
    //      window.location = window.location;
    //  }
 
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
                     <DataTable columns={columns} data={equipmentReportState.data} 
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                     />
                 </div>
 
                 <form action="" className="formm">
                     <div className="formComponent">
                         <label htmlFor="">ID</label> 
                         <input type="text" placeholder="Input report ID" onChange={(event) => {setId(event.target.value)}}/>
                     </div>
 
                    <div className="formComponent">
                        <label htmlFor="">Equipment Condition</label>
                        <select onChange={(event) => {setNewCondition(event.target.value)}}>
                                <option value="" selected disabled hidden></option>
                                <option value="Good">Good</option>
                                <option value="Broken (Irreparable)">Broken (Irreparable)</option>
                                <option value="Broken (Repairable)">Broken (Repairable)</option>
                                <option value="Outdated">Outdated</option>

                            </select>
                    </div>

                     <div className="formComponent">
                         <label htmlFor="">Update Details</label>
                         <textarea placeholder="Input details" cols="30" rows="10" onChange={(event) => {setReason(event.target.value)}}></textarea>
                     </div>
 
 
                     <div className="formComponent">
                         <button onClick={(e) => updateReport(e)}>Update</button>
                     </div>
 
                 </form>
 
             </div>
         </div>
     )
 
}

export default UpdateDamagedEquipmentReport;