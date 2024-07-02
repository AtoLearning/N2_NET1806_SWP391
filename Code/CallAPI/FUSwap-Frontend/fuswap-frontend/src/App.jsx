import { BrowserRouter, Routes, Route } from "react-router-dom";
import GHome from "./guest_pages/GHome.jsx";
import GContact from "./guest_pages/GContact.jsx";
import GLogin from "./guest_pages/GLogin.jsx";
import CHome from "./customer_pages/CHome.jsx";
import CLogout from "./customer_pages/CLogout.jsx";
import CDashboard from "./customer_pages/CDashboard.jsx";
import FormAdd from "./components/FormAdd.jsx";
import FormUpdate from "./components/FormUpdate.jsx";
import CContact from "./customer_pages/CContact.jsx";
import CustomerInfo from "./customer_pages/CustomerInfo.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import axios from "axios";

const baseURL = 'http://localhost:8080/api/v1/customer/profile';

function App() {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await axios.get(baseURL, { withCredentials: true });
                if (response.status === 200) {
                    setUser(response.data.obj);
                    // console.log(response.data.obj);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setUser(null);
                    // console.log("Unauthorized, no data");
                } else {
                    // console.log("Error: ");
                    // console.log(error);
                }
            }
        };

        getUserProfile();
    }, []);

    const guestRoutes = (
        <Routes>
            <Route path="/" element={<GHome />}></Route>
            <Route path="/login" element={<GLogin />}></Route>
            <Route path="/guest/contact" element={<GContact />}></Route>
        </Routes>
    );

    const customerRoutes = (
        <Routes>
            <Route path="/customer" element={<CHome />}></Route>
            <Route path="/customer/dashboard" element={<CDashboard />}></Route>
            <Route path="/customer/category" element={<FormAdd />}></Route>
            <Route path="/customer/category/:cateId" element={<FormUpdate />}></Route>
            <Route path="/customer/logout" element={<CLogout />}></Route>
            <Route path="/customer/contact" element={<CContact />}></Route>
            <Route path="/customer/info" element={<CustomerInfo />}></Route>
        </Routes>
    );

    return (
        <BrowserRouter>
            <ToastContainer position="top-right" autoClose={2000} />
            {user != null ? customerRoutes : guestRoutes}
        </BrowserRouter>
    );
}

export default App;