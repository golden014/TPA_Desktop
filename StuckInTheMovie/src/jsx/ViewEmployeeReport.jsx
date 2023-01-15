
import { collection, query } from "firebase/firestore";
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from "../actions/useSnapCollection";
import { db } from "../firebase-config";
import { useSnapCollection } from "../lib/useSnapCollection";
import Navbar from "./Navbar";

function ViewEmployeeReport() {



    const emp = useSnapCollection(query(collection(db, "employee")))
    const warnLett = useSnapCollection(query(collection(db, "WarningLetters")))


    if (emp.status === FIRESTORE_FETCH_LOADING) return <div>Loading...</div>
    if (emp.status === FIRESTORE_FETCH_ERROR) return <div>Error: {emp.error}</div>

    if (warnLett.status === FIRESTORE_FETCH_LOADING) return <div>Loading...</div>
    if (warnLett.status === FIRESTORE_FETCH_ERROR) return <div>Error: {warnLett.error}</div>

    let totalActive = 0;
    let totalResigned = 0;
    let totalFired = 0;
    let totalAccWarnLett = 0;
    let totalSalary = 0;
    let currAvgSalary = 0;

    

    emp.data.forEach(element => {
        if (element.Status === "Active") {
            totalActive++;
            totalSalary += element.Salary;
        }

        else if (element.Status === "Not Active (resigned)") {
            totalResigned++;
        }

        else if (element.Status === "Not Active (fired)") {
            totalFired++;
        }
    });

    warnLett.data.forEach(element => {
        if (element.Status === "Approved by Manager") {
            totalAccWarnLett++;
        }
    });

    currAvgSalary = totalSalary / totalActive;



    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h2>Employee Report</h2>
                <form action="" className="formm">
                    <div className="empComponent">
                        <label htmlFor="">Total Active Employee:</label>
                        <label htmlFor="">{totalActive}</label>
                    </div>

                    <div className="empComponent">
                        <label htmlFor="">Total Resigned Employee:</label>
                        <label htmlFor="">{totalResigned}</label>
                    </div>

                    <div className="empComponent">
                        <label htmlFor="">Total Fired Employee:</label>
                        <label htmlFor="">{totalFired}</label>
                    </div>

                    <div className="empComponent">
                        <label htmlFor="">Total Approved Warning Letters :</label>
                        <label htmlFor="">{totalAccWarnLett}</label>
                    </div>

                    <div className="empComponent">
                        <label htmlFor="">Active Employee Average Salary:</label>
                        <label htmlFor="">{currAvgSalary}</label>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ViewEmployeeReport;