import { async } from "@firebase/util";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { db } from "../firebase-config";
import Navbar from "./Navbar";

function AddMovie() {

    const [movieProducers, setMovieProducers] = useState([]);
    const movieProducerRef = collection(db, "MovieProducers");

    useEffect(() => {
        const getMovieProd = async () => {
            const data = await getDocs(movieProducerRef);

            setMovieProducers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getMovieProd();
    }, []);

    const [movie, setMovie] = useState([]);
    const movieRef = collection(db, "Movies");

    // useEffect(() => {
    //     const getMovie = async () => {
    //         const data = await getDocs(movieRef);

    //         setMovie(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    //     }

    //     getMovie();
    // }, []);

    const [prodId, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState(0);
    const [rating, setRating] = useState("");
    const [genre, setGenre] = useState("");

    //available date (date released and end)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [description, setDescription] = useState("");

    const createMovie = async (e) => {
        e.preventDefault();
        let name;
        for (let i = 0; i<movieProducers.length; i++) {
            if (movieProducers[i].ID == prodId) {
                name = movieProducers[i].PartnerName;
            }
        }

        await addDoc(movieRef, {ProducerID: prodId, ProducerName: name ,Title: title, Duration: duration, Rating: rating, Genre: genre, StartDate: startDate, EndDate: endDate, Description: description})
        alert("Success!");
        window.location = window.location;
    }


    const ExpandedComponent = (data) => {
        console.log(data.data);

       return (
            <div className="expandInfo">
                <p className="expandP">Description: {data.data.Description}</p>
            </div>
       )
    };


    const columns = [
        {
            name: "ID",
            selector: (row) => row.ID,
            sortable: true,
            width: "70px"
        },
        {
            name: "Movie Producer Name",
            selector: (row) => row.PartnerName,
            sortable: true,
            width: "250px"
        },
        {
            name: "Email",
            selector: (row) => row.Email,
            sortable: true,
            width: "250px"
        },
        {
            name: "PhoneNumber",
            selector: (row) => row.PhoneNumber,
            sortable: true,
            width: "250px"

        }
    ]

    return (
        
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>
            <div className="right">
                <h2>Add Movie</h2>
                <div className="tablee">
                    <DataTable columns={columns} data={movieProducers}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}/>
                </div>

                <form action="" className="formm">
                    <div className="formComponent">
                        <label htmlFor="">ProducerID</label> 
                        <input type="text" placeholder="Input Producer ID" onChange={(event) => {setId(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Title</label> 
                        <input type="text" placeholder="Input Title" onChange={(event) => {setTitle(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Duration</label> 
                        <input type="number" placeholder="Input Duration (minutes)" onChange={(event) => {setDuration(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Rating</label> 
                        <select onChange={(event) => {setRating(event.target.value)}} className="selectAddMovie">
                            <option value="" selected disabled hidden></option>
                            <option value="G">G</option>
                            <option value="PG">PG</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R">R</option>
                            <option value="NC-17">NC-17</option>
                        </select>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Genre</label> 
                        <input type="text" placeholder="Input Genre" onChange={(event) => {setGenre(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Start Airing</label> 
                        <input type="date" onChange={(event) => {setStartDate(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">End Airing</label> 
                        <input type="date" onChange={(event) => {setEndDate(event.target.value)}}/>
                    </div>

                    <div className="formComponent">
                        <label htmlFor="">Description</label>
                        <textarea placeholder="Input movie description" cols="30" rows="10" onChange={(event) => {setDescription(event.target.value)}}></textarea>
                    </div>

                    <div className="formComponent">
                        <button onClick={createMovie}>Add Movie</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddMovie;