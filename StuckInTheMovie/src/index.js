import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './jsx/Home';
import Login from './jsx/Login';
import ViewEmployee from './jsx/ViewEmployee';
import AddEmployee from './jsx/AddEmployee';
import WarningLetter from './jsx/WarningLetter';
import TerminationLetter from './jsx/TerminationLetter';
import AcceptTerminationLetter from './jsx/AcceptTerminationLetter';
import AcceptWarningLetter from './jsx/AcceptWarningLetter';
import SubmitFundRequest from './jsx/SubmitFundRequest';
import AcceptFundRequest from './jsx/AcceptFundRequest';
import SubmitPersonalLeave from './jsx/SubmitPersonalLeave';
import AcceptPersonalLeave from './jsx/AcceptPersonalLeave';
import AddFacilities from './jsx/AddFacilities';
import ViewFacilities from './jsx/ViewFacilities';
import SubmitResign from './jsx/SubmitResign';
import UpdateResigntionLetter from "./jsx/UpdateResignationLetter";
import AddAdvertisingPartner from "./jsx/AddAdvertisingPartner";
import AddFoodSupplier from './jsx/AddFoodSupplier';
import AddMovieProducer from './jsx/AddMovieProducer';
import AddMovie from './jsx/AddMovie';
import SelectMovieToShow from './jsx/SelectMovieToShow';
import GenerateSchedule from './jsx/SelectMovieToShow';
import GenerateMovieSchedule from './jsx/GenerateMovieSchedule';
import AddStudio from './jsx/AddStudio';
import ViewStudio from './jsx/ViewStudio';
import AddMember from './jsx/AddMember';
import ViewAllMember from './jsx/ViewAllMember';
import Print from "./jsx/Print"
import ViewSchedule from './jsx/ViewSchedule';
import ViewTodaysSchedule from './jsx/ViewTodaysSchedule';
import ViewSeat from './jsx/ViewSeat';
import TicketPayment from './jsx/TicketPayment';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route exact path="/tes" element={<Home />} ></Route>
        <Route exact path="/" element={<Login />} ></Route>
        <Route exact path="/addEmployee" element={<AddEmployee />} ></Route>
        {/* <Route exact path="/home" element={<Home />} ></Route> */}
        <Route exact path="/viewEmployee" element={<ViewEmployee/>} ></Route>
      
        <Route exact path="/warningLetter" element={<WarningLetter/>}></Route>
        <Route exact path="/accWarningLetter" element={<AcceptWarningLetter/>}></Route>
      
        <Route exact path="/terminationLetter" element={<TerminationLetter/>}></Route>
        <Route exact path="/accTerminationLetter" element={<AcceptTerminationLetter/>}></Route>
        
        <Route exact path="/submitFundRequest" element={<SubmitFundRequest/>}></Route>
        <Route exact path="/accFundRequest" element={<AcceptFundRequest/>}></Route>
       
        <Route exact path="/submitPersonalLeave" element={<SubmitPersonalLeave/>}></Route>
        <Route exact path="/accPersonalLeave" element={<AcceptPersonalLeave/>}></Route>

        <Route exact path="/addFacility" element={<AddFacilities/>}></Route>
        <Route exact path="/viewFacility" element={<ViewFacilities/>}></Route>

        <Route exact path="/submitResign" element={<SubmitResign/>}></Route>
        <Route exact path="/updateResignLetter" element={<UpdateResigntionLetter/>}></Route>

        <Route exact path="/addAdsPartner" element={<AddAdvertisingPartner/>}></Route>
        <Route exact path="/addFoodSupplier" element={<AddFoodSupplier/>}></Route>
        <Route exact path="/addMovieProducer" element={<AddMovieProducer/>}></Route>

        <Route exact path="/addMovie" element={<AddMovie/>}></Route>
        <Route exact path="/selectMovieToShow" element={<SelectMovieToShow/>}></Route>
        <Route exact path="/generateMovieSchedule" element={<GenerateMovieSchedule/>}></Route>
        <Route exact path="/viewSchedule" element={<ViewSchedule/>}></Route>
        <Route exact path="/viewTodaysSchedule" element={<ViewTodaysSchedule/>}></Route>

        
        <Route exact path="/addStudio" element={<AddStudio/>}></Route>
        <Route exact path="/viewStudio" element={<ViewStudio/>}></Route>

        <Route exact path="/addMember" element={<AddMember/>}></Route>
        <Route exact path="/viewAllMember" element={<ViewAllMember/>}></Route>

        <Route exact path="/print" element={<Print/>}></Route>

        <Route exact path="/viewSeat" element={<ViewSeat/>}></Route>

        <Route exact path="/ticketPayment" element={<TicketPayment/>}></Route>


      </Routes>
    </Router>
  </React.StrictMode>
);


