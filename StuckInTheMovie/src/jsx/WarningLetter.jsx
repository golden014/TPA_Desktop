import Navbar from "./Navbar"
import { useState, useEffect } from "react"
import {db} from "../firebase-config"
import {addDoc, collection, getDocs} from "firebase/firestore"
import DataTable from "react-data-table-component"
import "../css/WarningLetter.css"


function WarningLetter() {

      // const [issuedDate, setIssuedDate] = useState("");
   
    //-------------------------------------------------------------------------------------------

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
            sortable: true,
            width: "70px"
        },
        {
          name: "Name",
          selector: (row) => row.Name,
          width: "200px",
          sortable: true,
        },
        {
            name: "Role",
            selector: (row) => row.Role,
            sortable: true,
            width: "200px"
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
        }
        
    ]

    //-------------------------------------------------------------------------------------------

    
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    
    const [id, setId] = useState(0);
    const [reason, setReason] = useState("");
    const status = "Waiting for Manager Approval";

    
    const wLetterRef = collection(db, "WarningLetters");

    // const successMessage = "";

    function getName(id) {
        for (let i = 0; i<data.length; i++) {
            if (data[i].ID == id) {
                return data[i].Name;
            }
        }
    }

    const createWarningLetter = async (e) => {
        e.preventDefault();

        // let biggestID = 0;
        // console.log("biggest id " + biggestID);

        // for (let  i = 0; i<employees.length; i++) {
        //     if (employees[i].ID > biggestID) {
        //         biggestID = employees[i].ID;
        //     }
        //     console.log("i = " + i + ", id = " + employees[i].ID);
        // }

        const name = getName(id);

        await addDoc(wLetterRef, {EmployeeID: id, DateIssued: date, Reason: reason, Status: status, Name: name});
        // successMessage = "Success !";
        alert("Success !");
        window.location = window.location;
    }

    

    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Issue Warning Letter</h2>
                <div className="tablee">
                    <DataTable columns={columns} data={data} />
                </div>

                <form action="" className="formm">
                    <div className="formComponent">
                        <label htmlFor="">ID</label> 
                        <input type="text" placeholder="Input employee ID" onChange={(event) => {setId(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Reason</label>
                        <textarea placeholder="Input reason" cols="30" rows="10" onChange={(event) => {setReason(event.target.value)}}></textarea>
                    </div>

                    <div className="formComponent">
                        <button onClick={createWarningLetter}>Issue</button>
                    </div>

                </form>

                {/* <p>{successMessage}</p> */}
            </div>
        </div>
    )
}

export default WarningLetter;