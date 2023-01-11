import { useNavigate } from "react-router-dom"
// import "./loignView.css"

function LoginView(){
    let history = useNavigate();
    return (
        <div>
            <p onClick={(e) =>{
                history("/home") 
            }}>Hello World</p>
            <a href="/home">Go to home</a>
        </div>
    )
}

export default LoginView 