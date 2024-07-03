import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login/Login'

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  return (
    <Routes>
      {/* <Route path='/' element={<Welcome />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/AboutUs' element={<AboutUs />} /> */}
      <Route path='/Login' element={<Login />} />
    </Routes>
  );
}

// function FooterControl(){
//   const location = useLocation();
//   if(location.pathname === '/Login'){
//     return null;
//   }else{
//     return <Footer />;
//   }
// }

export default App
