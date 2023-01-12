import { useNavigate } from "react-router-dom"
import currUser from "./currUser"
import "../css/Navbar.css"


function Navbar() {
    const curr = new currUser();
    let history = useNavigate();

    const getNavbarMenus = () => {

        if (sessionStorage.getItem('Role') === 'Manager') {
            return (
                   

                    <div className="navbarKanan">
                        <ul class="itemsNavbar">
                            <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                            <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li>
                            <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                            <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                            <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li>
                            <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li>
                            <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li>
                            <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li>
                            <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li>
                            <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li>
                            <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                            <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                            <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                            <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li>
                            <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                            <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                            <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                            <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                            <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li>

                         </ul>

                         <p onClick={(e) => history("/")}>Sign Out</p>
                    </div>
                );
        }
    }

    return (
        
        <div class="navbarContainer">
            <div class="navbarKiri">
                <p>Welcome, {sessionStorage.getItem("Name")}</p>
            </div>

            {
                getNavbarMenus()
            }
           
        </div>
        
    )
}

export default Navbar;
