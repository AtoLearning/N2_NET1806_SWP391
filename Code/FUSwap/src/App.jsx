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
import Header from './components/Header/Header'
import Session from "./private/Session.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Main />
      <FooterControl />
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



      <Route path="/sesion" element={<Session />} />
    </Routes>
  );
}

function FooterControl(){
  const location = useLocation();
  if(location.pathname === '/Login'){
    return null;
  }else{
    return <Footer />;
  }
}

export default App
