// eslint-disable-next-line no-unused-vars
import React, {useEffect} from "react";
import Footer from "../components/Footer.jsx";
import GuestHeader from "../components/CHeader.jsx";
import {Button} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const LOGOUT_URL = "http://localhost:8080/api/v1/customer/logout";

export default function CLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        const sessionCookie = Cookies.get("sessionid");
        if (!sessionCookie) {
            navigate("/"); // chuyển hướng đến trang dashboard hoặc trang đã đăng nhập
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const response = await axios.post(LOGOUT_URL, {}, {withCredentials: true, });
            if (response.status === 200) {
                // Xóa các cookie
                Cookies.remove("sessionid", { path: "/" });
                // Chuyển hướng đến trang đăng nhập
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
            <GuestHeader />
            <div style={{width: "fit-content", margin: "0px auto"}}>
                <Button style={{fontSize: "20px"}} onClick={handleLogout}>Logout</Button>
            </div>
            <Footer />
        </>
    );
}
