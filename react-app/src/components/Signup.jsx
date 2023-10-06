import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";

function Signup() {

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');


    const handleApi = () => {
        const url = 'http://localhost:4000/signup';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    }
    return (
        <div>
            <Header />
            Welocme to signup page
            <br></br>
            USERNAME
            <input type="text" value={username}
                onChange={(e) => {
                    setusername(e.target.value)
                }} />
            <br></br>
            PASSWORD
            <input type="text" value={password}
                onChange={(e) => {
                    setpassword(e.target.value)
                }} />
            <br></br>
            <button onClick={handleApi}> SIGNUP </button>
            <Link to="/login">  LOGIN </Link>
        </div>
    )
}

export default Signup;