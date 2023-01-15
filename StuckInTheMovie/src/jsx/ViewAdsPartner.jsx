import { collection, query } from "firebase/firestore";
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from "../actions/useSnapCollection";
import { db } from "../firebase-config";
import { useSnapCollection } from "../lib/useSnapCollection";
import Navbar from "./Navbar";
import DataTable, { ExpanderComponentProps }  from "react-data-table-component";


function ViewAdsPartner() {

    const partnerState = useSnapCollection(query(collection(db, "AdvertisingPartners")));

    if (partnerState.status === FIRESTORE_FETCH_LOADING) return <div>Loading...</div>
    if (partnerState.status === FIRESTORE_FETCH_ERROR) return <div>Error: {partnerState.error}</div>

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

    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Advertising Partner Data</h2>
                 <div className="tablee">
                    <DataTable columns={columns} data={partnerState.data}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}/>
                </div>
            </div>
        </div>
    )
}

export default ViewAdsPartner;