import { useNavigate } from "react-router-dom"
import currUser from "./currUser"
import "../css/Navbar.css"


function Navbar() {
    const curr = new currUser();
    let history = useNavigate();

    const getNavbarMenus = () => {

        console.log(sessionStorage.getItem("Role") === "Admin");
        //manager
        if (sessionStorage.getItem('Role') === 'Manager') {
            return (
                
                    <div className="navbarKanan">
                        <ul class="itemsNavbar">
                            <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                            <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li>
                           
                            <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                            <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li>

                            <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                            <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li>
                            
                            <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li>
                            <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li>
                            
                            <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li>
                            <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li>
                           
                            <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                            <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                           
                            <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                            <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li>
                        
                            <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                            <li><p onClick={(e) => history("/viewAdsPartner")}>View Ads Partner</p></li>

                            <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                          
                            <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                            <li><p onClick={(e) => history("/viewMovieProducers")}>Update Warning Letter</p></li>


                            <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                            <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li>
                          
                            <li><p onClick={(e) => history("/addStudio")}>Add Studio</p></li>
                            <li><p onClick={(e) => history("/viewStudio")}>View Studio</p></li>
                           
                            <li><p onClick={(e) => history("/addMember")}>Add Member</p></li>
                            <li><p onClick={(e) => history("/viewAllMember")}>View All Member</p></li>
                           
                            <li><p onClick={(e) => history("/viewSchedule")}>View Schedule</p></li>
                            <li><p onClick={(e) => history("/viewTodaysSchedule")}>View Todays Schedule</p></li>
                           
                            <li><p onClick={(e) => history("/submitDamagedEquipmentReport")}>Submit Damaged Equipment Report</p></li>
                            <li><p onClick={(e) => history("/updateDamagedEquipmentReport")}>Update Damaged Equipment Report</p></li>
                            
                            <li><p onClick={(e) => history("/addPromos")}>Add Promo/Event </p></li>
                            <li><p onClick={(e) => history("/viewPromosData")}>View Promo/Event Data</p></li>



                         </ul>
                <br /><br />
                         <p onClick={(e) => history("/")}>Sign Out</p>
                    </div>
                );
        }

        else if (sessionStorage.getItem("Role") === "Human Resource Dept") {
            return (
                <div className="navbarKanan">
                        <ul class="itemsNavbar">
                            <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                            <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li>
                           
                            <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                            {/* <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li> */}

                            <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                            {/* <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li> */}
                            
                            {/* <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li>
                            <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li> */}
                            
                            {/* <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li> */}
                            <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li>
{/*                            
                            <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                            <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                           
                            <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                            <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li>
                        
                            <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                            <li><p onClick={(e) => history("/viewAdsPartner")}>View Ads Partner</p></li>

                            <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                          
                            <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                            <li><p onClick={(e) => history("/viewMovieProducers")}>Update Warning Letter</p></li>


                            <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                            <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li>
                          
                            <li><p onClick={(e) => history("/addStudio")}>Add Studio</p></li>
                            <li><p onClick={(e) => history("/viewStudio")}>View Studio</p></li>
                           
                            <li><p onClick={(e) => history("/addMember")}>Add Member</p></li>
                            <li><p onClick={(e) => history("/viewAllMember")}>View All Member</p></li>
                           
                            <li><p onClick={(e) => history("/viewSchedule")}>View Schedule</p></li>
                            <li><p onClick={(e) => history("/viewTodaysSchedule")}>View Todays Schedule</p></li>
                           
                            <li><p onClick={(e) => history("/submitDamagedEquipmentReport")}>Submit Damaged Equipment Report</p></li>
                            <li><p onClick={(e) => history("/updateDamagedEquipmentReport")}>Update Damaged Equipment Report</p></li>
                            
                            <li><p onClick={(e) => history("/addPromos")}>Add Promo/Event </p></li>
                            <li><p onClick={(e) => history("/viewPromosData")}>View Promo/Event Data</p></li> */}

                         </ul>
                <br /><br />
                         <p onClick={(e) => history("/")}>Sign Out</p>
                    </div>
            )
        } 

        else if (sessionStorage.getItem("Role") == "Storage Dept") {
            return (
                <div className="navbarKanan">
                        <ul class="itemsNavbar">
                            {/* <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                            <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li> */}
                           
                            {/* <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                            <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li> */}

                            {/* <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                            <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li> */}
                            
                            {/* <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li> */}
                            <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li>
                            
                            {/* <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li>
                            <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li> */}
                           
                            <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                            <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                           
                            {/* <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                            <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li>
                         */}
                            {/* <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                            <li><p onClick={(e) => history("/viewAdsPartner")}>View Ads Partner</p></li>

                            <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                          
                            <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                            <li><p onClick={(e) => history("/viewMovieProducers")}>Update Warning Letter</p></li>


                            <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                            <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li>
                          
                            <li><p onClick={(e) => history("/addStudio")}>Add Studio</p></li>
                            <li><p onClick={(e) => history("/viewStudio")}>View Studio</p></li>
                           
                            <li><p onClick={(e) => history("/addMember")}>Add Member</p></li>
                            <li><p onClick={(e) => history("/viewAllMember")}>View All Member</p></li>
                           
                            <li><p onClick={(e) => history("/viewSchedule")}>View Schedule</p></li>
                            <li><p onClick={(e) => history("/viewTodaysSchedule")}>View Todays Schedule</p></li>
                           
                            <li><p onClick={(e) => history("/submitDamagedEquipmentReport")}>Submit Damaged Equipment Report</p></li>
                            <li><p onClick={(e) => history("/updateDamagedEquipmentReport")}>Update Damaged Equipment Report</p></li>
                            
                            <li><p onClick={(e) => history("/addPromos")}>Add Promo/Event </p></li>
                            <li><p onClick={(e) => history("/viewPromosData")}>View Promo/Event Data</p></li> */}



                         </ul>
                <br /><br />
                         <p onClick={(e) => history("/")}>Sign Out</p>
                    </div>
            )
        }

        else if (sessionStorage.getItem("Role") == "External Dept") {
            return(
                    <div className="navbarKanan">
                        <ul class="itemsNavbar">
                            {/* <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                            <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li>
                           
                            <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                            <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li>

                            <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                            <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li>
                            
                            <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li>
                            <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li>
                            
                            <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li>
                            <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li> */}
{/*                            
                            <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                            <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                           
                            <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                            <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li> */}
                        
                            <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                            <li><p onClick={(e) => history("/viewAdsPartner")}>View Ads Partner</p></li>

                            <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                          
                            <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                            <li><p onClick={(e) => history("/viewMovieProducers")}>View Movie Producer</p></li>


                            {/* <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                            <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li>
                          
                            <li><p onClick={(e) => history("/addStudio")}>Add Studio</p></li>
                            <li><p onClick={(e) => history("/viewStudio")}>View Studio</p></li>
                           
                            <li><p onClick={(e) => history("/addMember")}>Add Member</p></li>
                            <li><p onClick={(e) => history("/viewAllMember")}>View All Member</p></li>
                           
                            <li><p onClick={(e) => history("/viewSchedule")}>View Schedule</p></li>
                            <li><p onClick={(e) => history("/viewTodaysSchedule")}>View Todays Schedule</p></li>
                           
                            <li><p onClick={(e) => history("/submitDamagedEquipmentReport")}>Submit Damaged Equipment Report</p></li>
                            <li><p onClick={(e) => history("/updateDamagedEquipmentReport")}>Update Damaged Equipment Report</p></li>
                            
                            <li><p onClick={(e) => history("/addPromos")}>Add Promo/Event </p></li>
                            <li><p onClick={(e) => history("/viewPromosData")}>View Promo/Event Data</p></li> */}



                         </ul>
                <br /><br />
                         <p onClick={(e) => history("/")}>Sign Out</p>
                    </div>
            )
            
        }

        else if (sessionStorage.getItem("Role") === "Schedule Division Movie Dept") {
            return (
                <div className="navbarKanan">
                <ul class="itemsNavbar">
                    {/* <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                    <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li>
                   
                    <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                    <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li>

                    <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                    <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li>
                    
                    <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li>
                    <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li>
                    
                    <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li>
                    <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li>
                   
                    <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                    <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                   
                    <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                    <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li>
                 */}
                    {/* <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                    <li><p onClick={(e) => history("/viewAdsPartner")}>View Ads Partner</p></li>

                    <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                  
                    <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                    <li><p onClick={(e) => history("/viewMovieProducers")}>Update Warning Letter</p></li> */}


                    <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                    <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li>
                  
                    {/* <li><p onClick={(e) => history("/addStudio")}>Add Studio</p></li> */}
                    {/* <li><p onClick={(e) => history("/viewStudio")}>View Studio</p></li> */}
                   
                    {/* <li><p onClick={(e) => history("/addMember")}>Add Member</p></li>
                    <li><p onClick={(e) => history("/viewAllMember")}>View All Member</p></li> */}
                   
                    <li><p onClick={(e) => history("/viewSchedule")}>View Schedule</p></li>
                    <li><p onClick={(e) => history("/viewTodaysSchedule")}>View Todays Schedule</p></li>
                   
                    {/* <li><p onClick={(e) => history("/submitDamagedEquipmentReport")}>Submit Damaged Equipment Report</p></li>
                    <li><p onClick={(e) => history("/updateDamagedEquipmentReport")}>Update Damaged Equipment Report</p></li>
                     */}
                    {/* <li><p onClick={(e) => history("/addPromos")}>Add Promo/Event </p></li>
                    <li><p onClick={(e) => history("/viewPromosData")}>View Promo/Event Data</p></li> */}



                 </ul>
        <br /><br />
                 <p onClick={(e) => history("/")}>Sign Out</p>
            </div>
            )
           
        }

        else if (sessionStorage.getItem("Role") == "Admin") {
            return (
                    <div className="navbarKanan">
                        <ul class="itemsNavbar">
                            <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                            <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li>
                           
                            <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                            <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li>

                            <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                            <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li>
                            
                            <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li>
                            <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li>
                            
                            <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li>
                            <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li>
                           
                            <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                            <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                           
                            <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                            <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li>
                        
                            <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                            <li><p onClick={(e) => history("/viewAdsPartner")}>View Ads Partner</p></li>

                            <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                          
                            <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                            <li><p onClick={(e) => history("/viewMovieProducers")}>View Movie Producer</p></li>


                            <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                            <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li>
                          
                            <li><p onClick={(e) => history("/addStudio")}>Add Studio</p></li>
                            <li><p onClick={(e) => history("/viewStudio")}>View Studio</p></li>
                           
                            <li><p onClick={(e) => history("/addMember")}>Add Member</p></li>
                            <li><p onClick={(e) => history("/viewAllMember")}>View All Member</p></li>
                           
                            <li><p onClick={(e) => history("/viewSchedule")}>View Schedule</p></li>
                            <li><p onClick={(e) => history("/viewTodaysSchedule")}>View Todays Schedule</p></li>
                           
                            <li><p onClick={(e) => history("/submitDamagedEquipmentReport")}>Submit Damaged Equipment Report</p></li>
                            <li><p onClick={(e) => history("/updateDamagedEquipmentReport")}>Update Damaged Equipment Report</p></li>
                            
                            <li><p onClick={(e) => history("/addPromos")}>Add Promo/Event </p></li>
                            <li><p onClick={(e) => history("/viewPromosData")}>View Promo/Event Data</p></li>

                            <li><p onClick={(e) => history("/changePassword")}>Send Change Password Email</p></li>
                            <li><p onClick={(e) => history("/viewEmployeeReport")}>View Employee Report</p></li>


                         </ul>
                <br /><br />
                         <p onClick={(e) => history("/")}>Sign Out</p>
                    </div>
            )
                
        }

        else if (sessionStorage.getItem("Role") === "Front Office Division Movie Dept") {
            return (
                <div className="navbarKanan">
                <ul class="itemsNavbar">
                    {/* <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                    <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li>
                
                    <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                    <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li>

                    <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                    <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li>
                    
                    <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li>
                    <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li>
                    
                    <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li>
                    <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li>
                
                    <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                    <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                
                    <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                    <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li>
                
                    <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                    <li><p onClick={(e) => history("/viewAdsPartner")}>View Ads Partner</p></li>

                    <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                
                    <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                    <li><p onClick={(e) => history("/viewMovieProducers")}>View Movie Producer</p></li> */}


                    {/* <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                    <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li> */}
                
                    {/* <li><p onClick={(e) => history("/addStudio")}>Add Studio</p></li> */}
                    <li><p onClick={(e) => history("/viewStudio")}>View Studio</p></li>
                
                    <li><p onClick={(e) => history("/addMember")}>Add Member</p></li>
                    <li><p onClick={(e) => history("/viewAllMember")}>View All Member</p></li>
                
                    <li><p onClick={(e) => history("/viewSchedule")}>View Schedule</p></li>
                    <li><p onClick={(e) => history("/viewTodaysSchedule")}>View Todays Schedule</p></li>
    {/*                            
                    <li><p onClick={(e) => history("/submitDamagedEquipmentReport")}>Submit Damaged Equipment Report</p></li>
                    <li><p onClick={(e) => history("/updateDamagedEquipmentReport")}>Update Damaged Equipment Report</p></li>
                    
                    <li><p onClick={(e) => history("/addPromos")}>Add Promo/Event </p></li>
                    <li><p onClick={(e) => history("/viewPromosData")}>View Promo/Event Data</p></li> */}



                </ul>
        <br /><br />
                <p onClick={(e) => history("/")}>Sign Out</p>
            </div>

            )
            
        }

        else if (sessionStorage.getItem("Role") === "Operation Division Movie Dept") {

            return (
<div className="navbarKanan">
                        <ul class="itemsNavbar">
                            {/* <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                            <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li>
                           
                            <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                            <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li>

                            <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                            <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li>
                            
                            <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li>
                            <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li>
                            
                            <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li>
                            <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li>
                           
                            <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                            <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                           
                            <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                            <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li>
                        
                            <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                            <li><p onClick={(e) => history("/viewAdsPartner")}>View Ads Partner</p></li>

                            <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                          
                            <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                            <li><p onClick={(e) => history("/viewMovieProducers")}>View Movie Producer</p></li>


                            <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                            <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li> */}
                          
                            <li><p onClick={(e) => history("/addStudio")}>Add Studio</p></li>
                            <li><p onClick={(e) => history("/viewStudio")}>View Studio</p></li>
{/*                            
                            <li><p onClick={(e) => history("/addMember")}>Add Member</p></li>
                            <li><p onClick={(e) => history("/viewAllMember")}>View All Member</p></li> */}
                           
                            <li><p onClick={(e) => history("/viewSchedule")}>View Schedule</p></li>
                            <li><p onClick={(e) => history("/viewTodaysSchedule")}>View Todays Schedule</p></li>
{/*                            
                            <li><p onClick={(e) => history("/submitDamagedEquipmentReport")}>Submit Damaged Equipment Report</p></li>
                            <li><p onClick={(e) => history("/updateDamagedEquipmentReport")}>Update Damaged Equipment Report</p></li>
                            
                            <li><p onClick={(e) => history("/addPromos")}>Add Promo/Event </p></li>
                            <li><p onClick={(e) => history("/viewPromosData")}>View Promo/Event Data</p></li> */}



                         </ul>
                <br /><br />
                         <p onClick={(e) => history("/")}>Sign Out</p>
                    </div>
            )

            
        }

        else if (sessionStorage.getItem("Role") === "Finance Dept") {
            return (
<div className="navbarKanan">
                        <ul class="itemsNavbar">
                            {/* <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                            <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li>
                           
                            <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                            <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li>

                            <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                            <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li>
                            
                            <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li> */}
                            <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li>
                            
                            {/* <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li>
                            <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li>
                           
                            <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                            <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                           
                            <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                            <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li>
                        
                            <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                            <li><p onClick={(e) => history("/viewAdsPartner")}>View Ads Partner</p></li>

                            <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                          
                            <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                            <li><p onClick={(e) => history("/viewMovieProducers")}>View Movie Producer</p></li>


                            <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                            <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li>
                          
                            <li><p onClick={(e) => history("/addStudio")}>Add Studio</p></li>
                            <li><p onClick={(e) => history("/viewStudio")}>View Studio</p></li>
                           
                            <li><p onClick={(e) => history("/addMember")}>Add Member</p></li>
                            <li><p onClick={(e) => history("/viewAllMember")}>View All Member</p></li>
                           
                            <li><p onClick={(e) => history("/viewSchedule")}>View Schedule</p></li>
                            <li><p onClick={(e) => history("/viewTodaysSchedule")}>View Todays Schedule</p></li>
                           
                            <li><p onClick={(e) => history("/submitDamagedEquipmentReport")}>Submit Damaged Equipment Report</p></li>
                            <li><p onClick={(e) => history("/updateDamagedEquipmentReport")}>Update Damaged Equipment Report</p></li>
                            
                            <li><p onClick={(e) => history("/addPromos")}>Add Promo/Event </p></li>
                            <li><p onClick={(e) => history("/viewPromosData")}>View Promo/Event Data</p></li> */}



                         </ul>
                <br /><br />
                         <p onClick={(e) => history("/")}>Sign Out</p>
                    </div>
            )
            
        }

        else if (sessionStorage.getItem("Role") === "Promotion and Event Dept") {

            return (
                <div className="navbarKanan">
                <ul class="itemsNavbar">
                    {/* <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                    <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li>
                   
                    <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                    <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li>

                    <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                    <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li>
                    
                    <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li>
                    <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li>
                    
                    <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li>
                    <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li>
                   
                    <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                    <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                   
                    <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                    <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li>
                
                    <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                    <li><p onClick={(e) => history("/viewAdsPartner")}>View Ads Partner</p></li>

                    <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                  
                    <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                    <li><p onClick={(e) => history("/viewMovieProducers")}>View Movie Producer</p></li>


                    <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                    <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li>
                  
                    <li><p onClick={(e) => history("/addStudio")}>Add Studio</p></li>
                    <li><p onClick={(e) => history("/viewStudio")}>View Studio</p></li>
                   
                    <li><p onClick={(e) => history("/addMember")}>Add Member</p></li> */}
                    <li><p onClick={(e) => history("/viewAllMember")}>View All Member</p></li>
{/*                            
                    <li><p onClick={(e) => history("/viewSchedule")}>View Schedule</p></li>
                    <li><p onClick={(e) => history("/viewTodaysSchedule")}>View Todays Schedule</p></li>
                   
                    <li><p onClick={(e) => history("/submitDamagedEquipmentReport")}>Submit Damaged Equipment Report</p></li>
                    <li><p onClick={(e) => history("/updateDamagedEquipmentReport")}>Update Damaged Equipment Report</p></li> */}
                    
                    <li><p onClick={(e) => history("/addPromos")}>Add Promo/Event </p></li>
                    <li><p onClick={(e) => history("/viewPromosData")}>View Promo/Event Data</p></li>



                 </ul>
        <br /><br />
                 <p onClick={(e) => history("/")}>Sign Out</p>
            </div>
            )
           
        }

        else if (sessionStorage.getItem("Role") === "Front Office Division Cafe Dept") {
            return (
<div className="navbarKanan">
                        <ul class="itemsNavbar">
                            <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                            <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li>
                           
                            <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                            <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li>

                            <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                            <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li>
                            
                            <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li>
                            <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li>
                            
                            <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li>
                            <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li>
                           
                            <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                            <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                           
                            <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                            <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li>
                        
                            <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                            <li><p onClick={(e) => history("/viewAdsPartner")}>View Ads Partner</p></li>

                            <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                          
                            <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                            <li><p onClick={(e) => history("/viewMovieProducers")}>View Movie Producer</p></li>


                            <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                            <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li>
                          
                            <li><p onClick={(e) => history("/addStudio")}>Add Studio</p></li>
                            <li><p onClick={(e) => history("/viewStudio")}>View Studio</p></li>
                           
                            <li><p onClick={(e) => history("/addMember")}>Add Member</p></li>
                            <li><p onClick={(e) => history("/viewAllMember")}>View All Member</p></li>
                           
                            <li><p onClick={(e) => history("/viewSchedule")}>View Schedule</p></li>
                            <li><p onClick={(e) => history("/viewTodaysSchedule")}>View Todays Schedule</p></li>
                           
                            <li><p onClick={(e) => history("/submitDamagedEquipmentReport")}>Submit Damaged Equipment Report</p></li>
                            <li><p onClick={(e) => history("/updateDamagedEquipmentReport")}>Update Damaged Equipment Report</p></li>
                            
                            <li><p onClick={(e) => history("/addPromos")}>Add Promo/Event </p></li>
                            <li><p onClick={(e) => history("/viewPromosData")}>View Promo/Event Data</p></li>



                         </ul>
                <br /><br />
                         <p onClick={(e) => history("/")}>Sign Out</p>
                    </div>
            )
            
        }

        else if (sessionStorage.getItem("Role") === "Kitchen Division Cafe Dept") {
            return (
<div className="navbarKanan">
                        <ul class="itemsNavbar">
                            <li><p onClick={(e) => history("/viewEmployee")}>View Employee</p></li>
                            <li><p onClick={(e) => history("/addEmployee")}>Add Employee</p></li>
                           
                            <li><p onClick={(e) => history("/warningLetter")}>Issue Warning Letter</p></li>
                            <li><p onClick={(e) => history("/accWarningLetter")}>Update Warning Letter</p></li>

                            <li><p onClick={(e) => history("/terminationLetter")}>Issue Termination Letter</p></li>
                            <li><p onClick={(e) => history("/accTerminationLetter")}>Update Termination Letter</p></li>
                            
                            <li><p onClick={(e) => history("/submitFundRequest")}>Submit Fund Request</p></li>
                            <li><p onClick={(e) => history("/accFundRequest")}>Update Fund Request</p></li>
                            
                            <li><p onClick={(e) => history("/submitPersonalLeave")}>Submit Personal Leave</p></li>
                            <li><p onClick={(e) => history("/accPersonalLeave")}>Update Personal Leave Request</p></li>
                           
                            <li><p onClick={(e) => history("/addFacility")}>Add New Facility</p></li>
                            <li><p onClick={(e) => history("/viewFacility")}>View Facility</p></li>
                           
                            <li><p onClick={(e) => history("/submitResign")}>Submit Resignation</p></li>
                            <li><p onClick={(e) => history("/updateResignLetter")}>Update Resignation Letter</p></li>
                        
                            <li><p onClick={(e) => history("/addAdsPartner")}>Add Advertisement Partner</p></li>
                            <li><p onClick={(e) => history("/viewAdsPartner")}>View Ads Partner</p></li>

                            <li><p onClick={(e) => history("/addFoodSupplier")}>Add Food Supplier</p></li>
                          
                            <li><p onClick={(e) => history("/addMovieProducer")}>Add Movie Producer</p></li>
                            <li><p onClick={(e) => history("/viewMovieProducers")}>View Movie Producer</p></li>


                            <li><p onClick={(e) => history("/addMovie")}>Add Movie</p></li>
                            <li><p onClick={(e) => history("/selectMovieToShow")}>Select Movie To Show</p></li>
                          
                            <li><p onClick={(e) => history("/addStudio")}>Add Studio</p></li>
                            <li><p onClick={(e) => history("/viewStudio")}>View Studio</p></li>
                           
                            <li><p onClick={(e) => history("/addMember")}>Add Member</p></li>
                            <li><p onClick={(e) => history("/viewAllMember")}>View All Member</p></li>
                           
                            <li><p onClick={(e) => history("/viewSchedule")}>View Schedule</p></li>
                            <li><p onClick={(e) => history("/viewTodaysSchedule")}>View Todays Schedule</p></li>
                           
                            <li><p onClick={(e) => history("/submitDamagedEquipmentReport")}>Submit Damaged Equipment Report</p></li>
                            <li><p onClick={(e) => history("/updateDamagedEquipmentReport")}>Update Damaged Equipment Report</p></li>
                            
                            <li><p onClick={(e) => history("/addPromos")}>Add Promo/Event </p></li>
                            <li><p onClick={(e) => history("/viewPromosData")}>View Promo/Event Data</p></li>



                         </ul>
                <br /><br />
                         <p onClick={(e) => history("/")}>Sign Out</p>
                    </div>
            )
            
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


