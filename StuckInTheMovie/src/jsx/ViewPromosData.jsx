import { useState, useEffect } from "react"
import DataTable, { ExpanderComponentProps }  from "react-data-table-component";
import Navbar from "./Navbar"
import {db} from "../firebase-config"
import {collection, getDocs} from "firebase/firestore"
import "../css/ViewEmployee.css"
import  QRCode from "react-qr-code"
import { useNavigate } from "react-router-dom";



function ViewPromosData() {

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
    const facilitiesRef = collection(db, "PromosAndEvents");

    useEffect(() => {
        const getEmployees = async () => {
            const data = await getDocs(facilitiesRef);
            // console.log(data);
            setData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getEmployees();

    }, []);

    const history = useNavigate();

    const handlePrint = (e, content) => {
        e.preventDefault();

        const QRContent = content;
  
        history('/print', {state: {identifier: QRContent}});
    }

    const columns = [

        {
            name: "ID",
            selector: (row) => row.ID,
            sortable: true
        },
        {
            name: "PartnerID",
            selector: (row) => row.PartnerID,
            sortable: true
        },
        {
          name: "Promo Name",
          selector: (row) => row.Name,
          sortable: true,
          width: "200px"
        },
        {
            name: "Discount Amount",
            selector: (row) => (row.Amount + " %"),
            sortable: true,
            width: "150px"

        },
        {
          name: "Valid Until",
          selector: (row) => row.ValidUntil,
          sortable: true,
          width: "150px"
        },
        {
            width: "220px",
            name: "Action",
            cell: (row) =>  {
                return (
                    <div className="accOrReject">
                            <button className="rej" onClick={(e) => handlePrint(e, ("PromoID: " + row.ID + ", DiscountAmount: " + row.Amount))}>Print QR</button>
                  
                    </div>
                )
          
                
            }
            
        }
    ]

    const ExpandedComponent = (data) => {
        console.log(data.data);

       return (
            <div className="expandInfo">
            
              <p className="expandP">Description: {data.data.Description}</p>
              <div style={{ height: "100", margin: "0 auto", width: "100%", display:"flex", justifyContent: "flex-start"}}>
                    <QRCode
                    size={200}
                    style={{ height: "100px", maxWidth: "100%", width: "100%" }}
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

            <div className="right">
                <div className="title2">
                    <h2 className="employeeList">Promo and Event List</h2>
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

export default ViewPromosData;