import './App.css'
import {BrowserRouter, Navigate, Route, Routes, useLocation} from 'react-router-dom'
import GHeader from './components/Header/GHeader'
import CHeader from './components/Header/CHeader'
import Footer from './components/Footer/Footer'
import Welcome from './pages/Welcome/Welcome.jsx'
import HomePage from './pages/HomePage/HomePage'
import AboutUs from './pages/AboutUs/AboutUs.jsx'
import NotFound from './pages/NotFound/NotFound'
import Role from './pages/Login/Role/Role'
import LoginCustomer from './pages/Login/LoginCustomer/LoginCustomer'
import LoginManager from './pages/Login/LoginManager/LoginManager'
import PostInform from './pages/PostInform/PostInform'
import MyPost from './pages/MyPost/MyPost'
import TradePost from './pages/Post/TradePost'
import SellPost from './pages/Post/SellPost'
import MyProfile from './pages/MyProfile/MyProfile.jsx'
import TheOrders from './pages/TheOrders/TheOrders.jsx'
import UserTransaction from './pages/Transactions/UserTransaction.jsx'
import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer } from 'react-toastify'
import SearchPage from "./pages/SearchPage/SearchPage.jsx";

const baseURL = "http://localhost:8080/api/v1/auth-status"

const guestRoutes = (
    <>
        <GHeader />
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='/role' element={<Role />} />
            <Route path='/c/login' element={<LoginCustomer />} />
            <Route path='/m/login' element={<LoginManager />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/role" />} />
        </Routes>
    </>
);

const customerRoutes = (
    <>
        <CHeader />
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='/c/post/details/:postId' element={<PostInform />} />
            <Route path='/c/my-profile' element={<MyProfile />} />
            <Route path="/c/my-posts" element={<MyPost />} />
            <Route path='/c/trade-post' element={<TradePost />} />
            <Route path='/c/sell-post' element={<SellPost />} />
            <Route path='/c/my-transaction' element={<UserTransaction />} />
            <Route path='/c/my-transactions' element={<TheOrders />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
    </>
);

const managerRoutes = (
    <>
        <CHeader />
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='/post/details/:postId' element={<PostInform />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
    </>
);

function App() {
  return (
    <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <RoutesComponent />
        <FooterControl />
    </BrowserRouter>
  );
}

function RoutesComponent() {
    // const [authStatus, setAuthStatus] = useState(false);
    // const [role, setRole] = useState("");
    const [route, setRoute] = useState(guestRoutes);
    const [loading, setLoading] = useState(true);
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(baseURL, { withCredentials: true });
            if (response.status === 200) {
                if (response.data.obj.includes('ROLE_ADMIN') || response.data.obj.includes('ROLE_MODERATOR')) {
                    setRoute(managerRoutes);
                } else if (response.data.obj.includes('ROLE_CUSTOMER')) {
                    setRoute(customerRoutes);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setRoute(guestRoutes);
            }
        } finally {
            setLoading(false); // Đánh dấu đã kết thúc loading sau khi xử lý
        }
    };
    useEffect(() => {
        checkAuthStatus();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Nếu đang loading, hiển thị thông báo loading
    }

    return route;
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
