import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import GHeader from './components/Header/GHeader'
import CHeader from './components/Header/CHeader'
import Footer from './components/Footer/Footer'
import Welcome from './pages/Welcome'
import HomePage from './pages/HomePage/HomePage'
import AboutUs from './pages/AboutUs'
import NotFound from './pages/NotFound/NotFound'
import Role from './pages/Login/Role/Role'
import LoginCustomer from './pages/Login/LoginCustomer/LoginCustomer'
import LoginManager from './pages/Login/LoginManager/LoginManager'
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import PostInform from './pages/PostInform/PostInform'
import MyPost from './pages/MyPost/MyPost'
import TradePost from './pages/Post/TradePost'
import SellPost from './pages/Post/SellPost'
import MyProfile from './pages/MyProfile/MyProfile.jsx'
import TheOrders from './pages/TheOrders/TheOrders.jsx'
import UserTransaction from './pages/Transactions/UserTransaction.jsx'
import axios from "axios"
import { useEffect, useState } from "react"

const baseURL = "http://localhost:8080/api/v1/auth-status"

function App() {
    return (
        <BrowserRouter>
            <HeaderControl />
            <Routes>
                <Route path='/' element={<PostInform />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/about_us' element={<AboutUs />} />
                <Route path='/not_found' element={<NotFound />} />
                <Route path='/role' element={<Role />} />
                <Route path='/c/login' element={<LoginCustomer />} />
                <Route path='/m/login' element={<LoginManager />} />
                <Route path='/SearchPage' element={<SearchPage />} />
                <Route path='/my_profile' element={<MyProfile />} />
                <Route path='/PostInform' element={<PostInform />} />
                <Route path="/my_post" element={<MyPost />} />
                <Route path='/trade_post' element={<TradePost />} />
                <Route path='/sell_post' element={<SellPost />} />
                <Route path='/the_orders' element={<TheOrders />} />
                <Route path='/sell_transaction' element={<UserTransaction/>} />
                <Route path="/post/:id" element={<PostInform />} /> 
            </Routes>
            <FooterControl />
        </BrowserRouter>
    );

}

function HeaderControl() {
    const [authStatus, setAuthStatus] = useState(false);
    const [role, setRole] = useState("");
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(baseURL, { withCredentials: true });
            if (response.status === 200) {
                setAuthStatus(true)
                setRole(response.data.obj)
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setAuthStatus(false);
                setRole("")
            }
            console.log(error);
        }
    };
    useEffect(() => {
        checkAuthStatus();
    }, []);
    if (authStatus) {
        if (role.includes('ROLE_ADMIN') || role.includes('ROLE_MODERATOR')) {
            console.log('ROLE_ADMIN');
            return <CHeader />
        } else if (role.includes('ROLE_CUSTOMER')) {
            console.log('ROLE_CUSTOMER');
            return <CHeader />
        }
    } else {
        console.log("GUEST")
        return <GHeader />
    }

}

function FooterControl() {
    const location = useLocation();
    if (location.pathname !== '/c/login' && location.pathname !== '/m/login' && location.pathname !== '/not_found' && location.pathname !== '/role') {
        return <Footer />;
    } else {
        return null;
    }
}


export default App
