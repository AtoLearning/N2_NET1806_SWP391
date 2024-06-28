import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login/Login'
import GHeader from './components/Header/GHeader'
import CHeader from './components/Header/CHeader'

function App() {
  return (
    <BrowserRouter>
      <HeaderControl/>
      <Main />
      <FooterControl/>
    </BrowserRouter>
  );
}

function Main() {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/AboutUs' element={<AboutUs />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/TestCHeader' element={<CHeader/>}/>
    </Routes>
  );
}
function HeaderControl() {
  const location = useLocation();
  if (location.pathname === '/Login' || location.pathname === '/Home' || location.pathname === '/AboutUs' || location.pathname === '/' ) {
    return <GHeader/>;
  } else {
    return null;
  }
}

function FooterControl() {
  const location = useLocation();
  if (location.pathname === '/Login' || location.pathname=== '/TestCHeader') {
    return null;
  } else {
    return <Footer />;
  }
}

export default App
