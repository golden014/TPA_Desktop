import { useEffect } from "react";
import QRCode from "react-qr-code";
import { useLocation } from "react-router-dom"

const Print = () => {
    const location = useLocation();
    const QRContent = location.state.identifier;

    let temp = false;
    console.log(QRContent)

    useEffect(() => {
        if(temp == false) {
            window.print();

            temp = true;
        }
    });

    return (
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}>
                 <QRCode
                size={500}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={QRContent}
                viewBox={`0 0 256 256`}
                />
            </div>
    )

}

export default Print;