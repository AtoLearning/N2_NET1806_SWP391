// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import CHeader from "../components/CHeader.jsx";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const baseURL = "http://localhost:8080/api/v1/customer/homepage";

export default function CHome() {
    const navigate = useNavigate();

    useEffect(() => {
        const sessionCookie = Cookies.get("sessionid");
        if (!sessionCookie) {
            navigate("/"); // chuyển hướng đến trang dashboard hoặc trang đã đăng nhập
        }
    }, [navigate]);

    const [categories, setCategories] = useState([]);

    const getAllCategories = async () => {
        try {
            const response = await axios.get(baseURL, { withCredentials: true });
            if(response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            <CHeader/>

            <div style={{marginTop: "50px"}}>
                <table style={{width: '100%', fontSize: '18px'}}>
                    <thead>
                    <tr>
                        <th>CateID</th>
                        <th>CateName</th>
                        <th>Manager</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(categories) ? (categories.map((category) => (
                            <tr key={category.cateId}>
                                <td style={{textAlign: 'center'}}>{category.cateId}</td>
                                <td style={{textAlign: 'center'}}>{category.cateName}</td>
                                <td style={{color: 'red', textAlign: 'center'}}>{category.muserName}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{textAlign: 'center'}}>No data</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Footer/>
        </>
    );
}
