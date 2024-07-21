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
import UpdatePost from './pages/Post/UpdatePost.jsx'
import MyProfile from './pages/MyProfile/MyProfile.jsx'
import TheOrders from './pages/TheOrders/TheOrders.jsx'
import UserTransaction from './pages/Transactions/UserTransaction.jsx'
import PendingPosts from "./pages/ManagerPostByMor/PendingPosts.jsx"
import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer } from 'react-toastify'
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import MHeader from './components/Header/MHeader.jsx'
import AHeader from './components/Header/AHeader.jsx'
import PostList from './components/AllPostList/PostList.jsx'
import ManagerProfile from './pages/MyProfile/ManagerProfile.jsx'
import PostDetail from './pages/PostDetail/PostDetail.jsx'
import PostReadonly from "./pages/Post/PostReadonly.jsx";
import ViewListReports from './pages/ViewListReportByMod/ViewListReports.jsx'

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
            <Route path='/c/goods-post' element={<TradePost />} />
            {/*<Route path='/c/sell-post' element={<SellPost />} />*/}
            <Route path='/c/update-post/:postId' element={<UpdatePost />} />
            <Route path='/c/post-readonly' element={<PostReadonly />} />
            <Route path='/c/my-transaction/details' element={<UserTransaction />} />
            <Route path='/c/my-transactions' element={<TheOrders />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
    </>
);

const adminRoutes = (
    <>
        <AHeader />
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='/c/post/details/:postId' element={<PostInform />} />
            <Route path='/m/moderate/posts' element={<PendingPosts />} />
            <Route path='/m/view-post' element={<PostList/>} />
            <Route path='/m/my-profile' element={<ManagerProfile/>} />
            <Route path='/m/moderate/posts/details' element={<PostDetail />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
    </>
);

const modRoutes = (
    <>
        <MHeader />
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='/c/post/details/:postId' element={<PostInform />} />
            <Route path='/m/moderate/posts' element={<PendingPosts />} />
            <Route path='/m/view-post' element={<PostList/>} />
            <Route path='/m/my-profile' element={<ManagerProfile/>} />
            <Route path='/m/moderate/posts/details' element={<PostDetail />} />
            <Route path='/m/moderate/reports' element={<ViewListReports/>} />
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
                if (response.data.obj.includes('ROLE_ADMIN')) {
                    setRoute(adminRoutes);
                } else if(response.data.obj.includes('ROLE_MODERATOR')) {
                    setRoute(modRoutes);
                } else if (response.data.obj.includes('ROLE_CUSTOMER')) {
                    setRoute(customerRoutes);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setRoute(guestRoutes);
            }
        } finally {
            setLoading(false);
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
