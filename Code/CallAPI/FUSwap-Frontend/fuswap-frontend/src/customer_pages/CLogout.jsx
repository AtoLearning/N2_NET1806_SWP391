import Footer from "../components/Footer.jsx";
import CHeader from "../components/CHeader.jsx";
import {Button} from "@mui/material";

const LOGOUT_URL = "http://localhost:8080/logout";

export default function CLogout() {

    const handleLogout = () => {
        window.location.href = LOGOUT_URL;
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
