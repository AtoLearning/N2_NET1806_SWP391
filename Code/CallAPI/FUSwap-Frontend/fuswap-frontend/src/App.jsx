import { BrowserRouter, Routes, Route } from "react-router-dom";
import GHome from "./guest_pages/GHome.jsx";
import GContact from "./guest_pages/GContact.jsx";
import GLogin from "./guest_pages/GLogin.jsx";
import CHome from "./customer_pages/CHome.jsx";
import CLogout from "./customer_pages/CLogout.jsx";
import GetSession from "./private/GetSession.jsx";
import CDashboard from "./customer_pages/CDashboard.jsx";
import FormAdd from "./components/FormAdd.jsx";
import FormUpdate from "./components/FormUpdate.jsx";
import CContact from "./customer_pages/CContact.jsx";
import CustomerInfo from "./customer_pages/CustomerInfo.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <BrowserRouter>
            <ToastContainer position="top-right" autoClose={2000} />
            <Routes>
                {/*Guest*/}
                <Route path="/" element={<GHome />}></Route>
                <Route path="/form/login" element={<GLogin />}></Route>
                <Route path="/guest/contact" element={<GContact />}></Route>

                {/*Customer*/}
                <Route path="/customer" element={<CHome />}></Route>
                <Route path="/customer/dashboard" element={<CDashboard />}></Route>
                <Route path="/customer/category" element={<FormAdd />}></Route>
                <Route path="/customer/category/:cateId" element={<FormUpdate />}></Route>
                <Route path="/customer/logout" element={<CLogout />}></Route>
                <Route path="/customer/contact" element={<CContact />}></Route>
                <Route path="/customer/info" element={<CustomerInfo />}></Route>

                <Route path="/request" element={<GetSession />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;