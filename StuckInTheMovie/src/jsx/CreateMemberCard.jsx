import { useEffect } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom"

const CreateMemberCard = () => {

    const location = useLocation();
    const ID = location.state.ID;
    const Name = location.state.Name;
    const DateJoin = location.state.DateJoin;
    const MemberType = location.state.MemberType;

    let temp = false;

    let history = useNavigate();
    
    useEffect(() => {
        if(temp == false) {
            window.print();
            temp = true;
        } else {
            history("/addMember");
        }
    }, []);


    return(
        <div className="bigContainerReceipt">
            <div className="movieDetailss">
                <div className="memberTitle">
                    <h2>Stuck In The Movie Member</h2>
                </div>
                <div className="movieReceiptt">
                    <h3>ID: </h3>
                    <h3>{ID}</h3>
                </div>

                <div className="movieReceiptt">
                    <h3>Name: </h3>
                    <h3>{Name}</h3>
                </div>
                
                <div className="movieReceiptt">
                    <h3>Date Joined: </h3>
                    <h3>{DateJoin}</h3>
                </div>

                <div className="movieReceiptt">
                    <h3>Member Type: </h3>
                    <h3>{MemberType}</h3>
                </div>

                <br /><br /><br />

                <div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}>
                    <QRCode
                    size={200}
                    style={{ height: "100px", maxWidth: "100%", width: "100%" }}
                    value={"MemberID: " + ID + ", Name: " + Name}
                    viewBox={`0 0 256 256`}
                    />
                </div>

            </div>
        </div>
    )
}

export default CreateMemberCard;