import Navbar from "./Navbar"


function Default() {

    return (
        <div className="bigContainer">
            <div className="left">
                <Navbar/>
            </div>

            <div className="right">
                <h1>Hello, {sessionStorage.getItem("Name")}</h1>
            </div>
        </div>
    )
}

export default Default;