import { addDoc, collection, query } from "firebase/firestore";
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from "../actions/useSnapCollection";
import { db } from "../firebase-config";
import { useSnapCollection } from "../lib/useSnapCollection";
import Navbar from "./Navbar"
import DataTable, { ExpanderComponentProps }  from "react-data-table-component";
import { useState } from "react";


function AddPromosOrEvent() {

    const [amount, setAmount] = useState(0);
    const [partnerID, setPartnerID] = useState("");
    const [promoName, setPromoName] = useState("");
    const [description, setDescription] = useState("");
    const [validUntil, setValidUntil] = useState("");

    const partnerState = useSnapCollection(query(collection(db, "AdvertisingPartners")));
    const promoState = useSnapCollection(query(collection(db, "PromosAndEvents")));

    
    if (partnerState.status === FIRESTORE_FETCH_LOADING) return <div>Loading...</div>
    if (partnerState.status === FIRESTORE_FETCH_ERROR) return <div>Error: {partnerState.error}</div>

    if (promoState.status === FIRESTORE_FETCH_LOADING) return <div>Loading...</div>
    if (promoState.status === FIRESTORE_FETCH_ERROR) return <div>Error: {promoState.error}</div>

    const columns = [
        {
            name: "PartnerID",
            selector: (row) => row.ID,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.PartnerName,
            sortable: true,
            width: "200px"
        },
        {
            name: "Email",
            selector: (row) => row.Email,
            sortable: true,
            width: "200px"
        },
        {
            name: "PhoneNumber",
            selector: (row) => row.PhoneNumber,
            sortable: true,
            width: "200px"
        }
    ];

    const ExpandedComponent = (data) => {
       return (
        <div className="expandInfo">
            <p className="expandP">Partner Description: {data.data.Description}</p>
        </div>
       )
    };

    const createPromo = async (e) => {
        e.preventDefault();
        const ref = collection(db, "PromosAndEvents");

        let biggestID = 0;
        for (let  i = 0; i<promoState.data.length; i++) {
            if (promoState.data[i].ID > biggestID) {
                biggestID = promoState.data[i].ID;
            }
        }

        await addDoc(ref, {
            ID: biggestID+1,
            PartnerID: partnerID,
            Name: promoName,
            Amount: amount,
            Description: description,
            ValidUntil: validUntil
        })

        alert("Success");
        window.location = window.location;
    }

    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Add Promos or Event</h2>
                <div className="tablee">
                    <DataTable columns={columns} data={partnerState.data}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}/>
                </div>

                <form action="" className="formm">
                    <div className="formComponent">
                        <label htmlFor="">ID</label> 
                        <input type="text" placeholder="Input Partner ID" onChange={(event) => {setPartnerID(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Promo Name</label> 
                        <input type="text" placeholder="Input Promo/Event Name" onChange={(event) => {setPromoName(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Discount Amount (in %)</label> 
                        <input type="number"  onChange={(event) => {setAmount(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Promo Description</label>
                        <textarea placeholder="Input Description" cols="30" rows="10" onChange={(event) => {setDescription(event.target.value)}}></textarea>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Valid Until</label>
                        <input type="date" onChange={(event) => {setValidUntil(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <button onClick={(e) => {createPromo(e)}}>Add Promo</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default AddPromosOrEvent;