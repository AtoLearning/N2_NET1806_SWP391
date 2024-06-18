import Footer from "../components/Footer.jsx";
import CHeader from "../components/CHeader.jsx";
import {Button} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LOGOUT_URL = "http://localhost:8080/api/v1/customer/logout";

export default function CLogout() {

    //check if there is 'sessionid' in the cookie
    const navigate = useNavigate();
    useEffect(() => {
        const sessionCookie = Cookies.get("sessionid");
        if (!sessionCookie) {
            //navigate to homepage if not logged in (or no cookie or expired cookie)
            navigate("/");
        }
    }, [navigate]);

    //after onClick is pressed, handleLogout is called
    //call the api to let the back-end know that the session needs to be deleted in Redis
    //( or user want to log out, that's it )
    const handleLogout = async () => {
        try {
            const response = await axios.post(LOGOUT_URL, {}, {withCredentials: true, });
            if (response.status === 200) {

                //after back-end says delete cookie successfully, front-end should delete cookie too
                Cookies.remove("sessionid", { path: "/" });
                //after delete cookie and session, redirect back to homepage
                window.location.href = "http://localhost:3000";

            } else {
                console.error("Logout failed:", response.data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <>
            <CHeader />
            <div style={{width: "fit-content", margin: "0px auto"}}>
                <Button style={{fontSize: "20px"}} onClick={handleLogout}>Logout</Button>
            </div>
            <Footer />
        </>
    );
}
