// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import GHeader from './components/Header/GHeader'
import CHeader from './components/Header/CHeader'
import Footer from './components/Footer/Footer'
import Welcome from './pages/Welcome'
import HomePage from './pages/HomePage/HomePage'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login/Login'
import CProfile from './pages/CProfile'

const baseURL = 'http://localhost:8080/api/v1/customer/profile';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}


function Main() {

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
      <Route path='/' element={<Welcome />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/about_us' element={<AboutUs />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );

  const customerRoutes = (
    <Routes>
      <Route path='/home' element={<HomePage />} />
      <Route path='/customer_profile' element={<CProfile />} />
    </Routes>
  );

  return (
    <>
      {user != null ? <CHeader /> : <GHeader />}
      {user != null ? customerRoutes : guestRoutes}
      {FooterControl()}
    </>
  );
}

function FooterControl() {
  const location = useLocation();
  if(location.pathname !== '/login'){
    return <Footer />;
  }else{
    return null;
  }
}


export default App
