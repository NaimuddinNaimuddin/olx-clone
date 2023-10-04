import { Link } from "react-router-dom";
import Header from "./Header";

function Login() {
    return (
        <div>
            <Header />
            Welocme to login page
            <br></br>
            USERNAME
            <input type="text" />
            <br></br>
            PASSWORD
            <input type="text" />
            <br></br>
            <button> LOGIN </button>
            <Link to="/signup">  SIGNUP </Link>
        </div>
    )
}

export default Login;