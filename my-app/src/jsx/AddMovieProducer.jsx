import Navbar from "./Navbar"
import { useState, useEffect } from "react"
import {db} from "../firebase-config"
import {addDoc, collection, getDocs} from "firebase/firestore"
import DataTable from "react-data-table-component"
import "../css/WarningLetter.css"


function AddMovieProducer() {

      // const [issuedDate, setIssuedDate] = useState("");
   
    
    // const [name, setName] = useState("");

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    
    // const [id, setId] = useState(0);
    // const [reason, setReason] = useState("");
    
    
    
    const advertisingPartnerRef = collection(db, "MovieProducers");
    const [adsPartner, setAdsPartner] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [description, setDescription] = useState("");

    // const successMessage = "";

    const createPartner = async (e) => {
        e.preventDefault();

        // let biggestID = 0;
        // console.log("biggest id " + biggestID);

        // for (let  i = 0; i<employees.length; i++) {
        //     if (employees[i].ID > biggestID) {
        //         biggestID = employees[i].ID;
        //     }
        //     console.log("i = " + i + ", id = " + employees[i].ID);
        // }
        // const name = getName(id);

        let biggestID = 0;
        console.log("biggest id " + biggestID);

        for (let  i = 0; i<adsPartner.length; i++) {
            if (adsPartner[i].ID > biggestID) {
                biggestID = adsPartner[i].ID;
            }
            console.log("i = " + i + ", id = " + adsPartner[i].ID);
        }


        await addDoc(advertisingPartnerRef, {PartnerName: name, Email: email, PhoneNumber: phoneNum, Description: description, ID: biggestID + 1});
        // successMessage = "Success !";
        alert("Success !");
        window.location = window.location;
    }

    useEffect(() => {
        const getEmployees = async () => {
            const data = await getDocs(advertisingPartnerRef);
            // console.log(data);
            setAdsPartner(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getEmployees();


    }, []);

    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Add Movie Producer</h2>
                {/* <div className="tablee">
                    <DataTable columns={columns} data={data} />
                </div> */}

                <form action="" className="formm">
                    <div className="formComponent">
                        <label htmlFor="">Name</label> 
                        <input type="text" onChange={(event) => {setName(event.target.value)}}/>

                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Email</label> 
                        <input type="email" onChange={(event) => {setEmail(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">PhoneNumber</label> 
                        <input type="text" onChange={(event) => {setPhoneNum(event.target.value)}}/>

                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Description</label>
                        <textarea placeholder="Input Description" cols="30" rows="10" onChange={(event) => {setDescription(event.target.value)}}></textarea>
                    </div>

                    <div className="formComponent">
                        <button onClick={createPartner}>Add Partner</button>
                    </div>

                </form>

                {/* <p>{successMessage}</p> */}
            </div>
        </div>
    )
}

export default AddMovieProducer;