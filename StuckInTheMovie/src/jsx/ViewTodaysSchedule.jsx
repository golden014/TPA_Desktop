
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import Navbar from "./Navbar"
import DataTable from "react-data-table-component";


function ViewTodaysSchedule() {

    function getTime(shift) {

        switch (shift) {
            case 1:
                return "09:00 - 11:30";
            case 2:
                return "12:00 - 14:30";
            case 3:
                return "15:00 - 17:30";
            case 4:
                return "18:00 - 20:30";
            case 5:
                return "21:00 - 23:30";
        }
    }

    const [data, setData] = useState([]);
    
    // const [q, setQ] = useState("");
    const empCollectionRef = collection(db, "MovieSchedules");

    useEffect(() => {
        const getEmployees = async () => {
            const data = await getDocs(empCollectionRef);
            // console.log(data);
            setData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getEmployees();

    }, []);

    const current = new Date();
    const currDate = current.toLocaleDateString("en-CA");

    const filtered = [];

    let temp = 0;

    for (let i = 0; i<data.length; i++) {
        if (data[i].Date === currDate) {
            filtered[temp] = data[i];
            temp++;
        }
    }


    const columns = [
        {
            name: "Title",
            selector: (row) => row.MovieTitle,
            sortable: true,
            width: "250px"
        },
        // {
        //     name: "Date",
        //     selector: (row) => row.Date,
        //     sortable: true,
        //     width: "200px"
        // },
        {
          name: "Rating",
          selector: (row) => row.MovieRating,
          width: "200px",
          sortable: true,
        },
        {
            name: "Time",
            selector: (row) => getTime(row.AiringShift),
            sortable: true,
            width: "200px"
        },
        {
          name: "Studio",
          selector: (row) => row.StudioID,
          width: "200px",
          sortable: true,
        }
      
        // {
        //     name: "Test",
        //     cell: (row) => <button onClick={}>tes</button>
        // }

        
    ]

    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>View Todays Movie Schedule</h2>
                <div className="tablee">
                    <DataTable columns={columns} data={filtered} />
                </div>
            </div>
        </div>
    )
}

export default ViewTodaysSchedule;