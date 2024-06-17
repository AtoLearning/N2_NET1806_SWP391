// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GHome from "./guest_pages/GHome.jsx";
import GContact from "./guest_pages/GContact.jsx";
import GLogin from "./guest_pages/GLogin.jsx";
import CHome from "./customer_pages/CHome.jsx";
import CLogout from "./customer_pages/CLogout.jsx";
import GetSession from "./private/GetSession.jsx";
import CDashboard from "./customer_pages/CDashboard.jsx";
import CContact from "./customer_pages/CContact.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GHome />}></Route>
                <Route path="/form/login" element={<GLogin />}></Route>
                <Route path="/contact" element={<GContact />}></Route>

                <Route path="/customer" element={<CHome />}></Route>
                <Route path="/customer/dashboard" element={<CDashboard />}></Route>
                <Route path="/customer/logout" element={<CLogout />}></Route>
                <Route path="/customer/contact" element={<CContact />}></Route>

                <Route path="/request" element={<GetSession />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;