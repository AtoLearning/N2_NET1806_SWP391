// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import axios from "axios";
import Footer from "../components/Footer.jsx";
import CHeader from "../components/CHeader.jsx";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const baseURL = "http://localhost:8080/api/v1/customer/contact";

export default function CContact() {
    const navigate = useNavigate();

    useEffect(() => {
        const sessionCookie = Cookies.get("sessionid");
        if (!sessionCookie) {
            navigate("/contact"); // chuyển hướng đến trang dashboard hoặc trang đã đăng nhập
        }
    }, [navigate]);

    const grid_container = {

        display: "flex",
        gridTemplateColumns: "auto auto auto",
        gridGap: "100px",
        backgroundColor: "#f37121",
        padding: "10px"
    }

    const grid_item = {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        border: "1px solid rgba(0, 0, 0, 0.8)",
        padding: "20px",
        fontSize: "30px",
        textAlign: "center",
        width: "500px"
    }

    const [managers, setManagers] = useState([]);

    const getAllManagers = async () => {
        try {
            const response = await axios.get(baseURL, { withCredentials: true });
            if(response.status === 200) {
                setManagers(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllManagers();
    }, []);

    return (
        <>
            <CHeader />
            <div style={grid_container}>
                {(managers) ? (managers.map((manager) => (
                        <div key={manager.id} style={grid_item}>
                            <img src={manager.picture} alt="Avatar" style={{width: "100px"}}/>
                            <p style={{fontWeight: "bold", fontSize: "24px"}}>Name: {manager.givenName} {manager.familyName}</p>
                            <p style={{fontSize: "20px"}}>DOB: {manager.dob}</p>
                            <p style={{fontSize: "20px"}}>Role: {manager.role}</p>
                        </div>
                    ))
                ) : (
                    <h2 style={{textAlign: "center"}}>No anyone here!</h2>
                )}
            </div>
            <Footer />
        </>
    );
}
