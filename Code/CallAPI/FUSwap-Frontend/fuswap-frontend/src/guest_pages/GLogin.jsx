// eslint-disable-next-line no-unused-vars
import React, {useEffect} from "react";
import GuestHeader from "../components/GHeader.jsx";
import Footer from "../components/Footer.jsx";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const baseURL = "http://localhost:8080/api/v1/auth/login";

const GLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const sessionCookie = Cookies.get("sessionid");
        if (sessionCookie) {
            navigate("/customer"); // chuyển hướng đến trang dashboard hoặc trang đã đăng nhập
        }
    }, [navigate]);

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
