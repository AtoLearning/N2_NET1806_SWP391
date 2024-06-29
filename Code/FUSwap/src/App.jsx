import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import GHeader from './components/Header/GHeader'
import CHeader from './components/Header/CHeader'
import Footer from './components/Footer/Footer'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login/Login'
import CProfile from './pages/CProfile'


function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}


function Main() {
  
  
  const user = false;
  const guestRoutes = (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about_us' element={<AboutUs />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );

  const customerRoutes = (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/customer_profile' element={<CProfile />} />
    </Routes>
  );

  return (
    <>
      {user ? <GHeader /> : <CHeader />}
      {user ? guestRoutes : customerRoutes}
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
