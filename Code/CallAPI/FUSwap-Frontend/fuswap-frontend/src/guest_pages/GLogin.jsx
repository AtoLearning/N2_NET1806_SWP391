import GuestHeader from "../components/GHeader.jsx";
import Footer from "../components/Footer.jsx";
import { Button } from "@mui/material";

const baseURL = "http://localhost:8080/oauth2/authorization/google";

const GLogin = () => {

    const handleLogin = () => {
        window.location.href = baseURL;
    };

    return (
        <>
            <GuestHeader />

            <div style={{ width: "fit-content", margin: "0px auto" }}>
                <Button style={{ fontSize: "20px" }} onClick={handleLogin}>
                    Login with Google
                </Button>
            </div>

            <Footer />
        </>
    );
};

export default GLogin;
