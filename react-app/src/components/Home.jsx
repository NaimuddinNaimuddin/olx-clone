import { useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    return (
        <div>
            <Header />
            Welocme to home..
        </div>
    )
}

export default Home;