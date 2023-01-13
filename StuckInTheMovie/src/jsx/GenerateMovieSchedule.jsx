
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { db } from "../firebase-config";
import Navbar from "./Navbar";


function GenerateMovieSchedule() {

    const startDate = sessionStorage.getItem("StartDate");
    const endDate = sessionStorage.getItem("EndDate");

    const [movies, setMovies] = useState([]);

    const movieRef = collection(db, "Movies");
    
    
    useEffect(() => {

        const getMovies = async () => {
            const data = await getDocs(movieRef);

            setMovies(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getMovies();
    }, []);

    console.log("movies");
    console.log(movies);
    //temp utk tambahin ke movies filtered
    const moviesFiltered = [];
    let temp = 0;

    //utk mencari movies yg didalam range yg diberikan
    for (let i = 0; i<movies.length; i++) {
        if(movies[i].StartDate < startDate && movies[i].EndDate > endDate) {
            moviesFiltered[temp] = movies[i];
            temp++;
        }
    }


    console.log("movies filtered");
    console.log(moviesFiltered);


    const columns = [
        {
            name: "Title",
            selector: (row) => row.Title,
            sortable: true,
            width: "200px"
        },
        {
            name: "Producer",
            selector: (row) => row.ProducerName,
            sortable: true
        },
        {
            name: "Rating",
            selector: (row) => row.Rating,
            sortable: true
        },
        {
            name: "Duration",
            selector: (row) => row.Duration,
            sortable: true
        },
        {
            name: "Genre",
            selector: (row) => row.Genre,
            sortable: true
        }
    ]

    const ExpandedComponent = (data) => {
        // console.log(data.data);

       return (
            <div className="expandInfo">
                <p className="expandP">Start Date: {data.data.StartDate}</p>
                <p className="expandP">End Date: {data.data.EndDate}</p>
                <p className="expandP">Description: {data.data.Description}</p>
            </div>
       )
    };

    const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);

    const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

    const [studio, setStudio] = useState([]);
    const studioRef = collection(db, "Studios");

    useEffect(() => {
        const getStudios = async () => {
            const data2 = await getDocs(studioRef);
            setStudio(data2.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getStudios();
    }, []);

    // console.log(moviesFiltered.length);
    //len dari movies yg avail udah dapat
    //
    // console.log("studio len: " + studio.length);
    const studioFiltered = [];

    //filter studio2 yg status nya available saja
    let temp2 = 0;
    for (let i = 0; i<studio.length; i++) {
        if (studio[i].Status === "Available") {
            studioFiltered[temp2] = studio[i];
            temp2++;
        }
    }
    
    
    // console.log(studioFiltered);

    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();

    const dayRange = (endDateTime - startDateTime) / (1000 * 3600 * 24);

    // console.log("day range = " + dayRange);

    const [schedule, setSchedule] = useState([]);
    const scheduleRef = collection(db, "MovieSchedules");

    console.log("selected rows: ");
    console.log(selectedRows);

    const generateSchedule = async (e) => {
        e.preventDefault();

        for (let i = 0; i<=dayRange; i++) {
            for (let j = 0; j<studioFiltered.length; j++) {
                for (let k = 1; k<6; k++) {

                    //mau random movie dari movieFiltered
                    let rdMovie = Math.floor(Math.random() * selectedRows.length);

                    let currDateTime = startDateTime + (24 * 60 * 60 * 1000 * i);

                    let currDateTemp = new Date(currDateTime);

                    let currDate = currDateTemp.toLocaleDateString("en-CA");


                    await addDoc(scheduleRef, {
                        MovieTitle: selectedRows[rdMovie].Title, 
                        MovieRating: selectedRows[rdMovie].Rating,
                        MovieDuration: selectedRows[rdMovie].Duration,
                        StudioID: studioFiltered[j].ID,
                        Date: currDate,
                        AiringShift: k,
                        Advertisement: ""
                    });

                    // alert("Generate schedule from " + startDate +" to " + endDate + " success!");
                    // window.location = window.location;
                }
            }
        }
    }

    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Available Movies</h2>
                <DataTable columns={columns} data={moviesFiltered}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleCleared}
                />

                <div className="generateSchedule">
                    <p>Generate schedule from {startDate} to {endDate}</p>
                    <button onClick={generateSchedule}>Generate</button>
                </div>
            </div>
        </div>
    )
}

export default GenerateMovieSchedule;