import React from "react";
import { Link } from "react-router-dom"
import './HeaderStyle.css';
import { FaSearch, FaUser } from "react-icons/fa";


export default function Header() {
  return (
    <header className="header">
    {/* left header */}
      <div className="header_left">
        <div>
          <img 
          className="img_logo" 
          src={'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FWebLogoFUS.png?alt=media&token=4a3367e1-dd52-4715-82e9-ebc80ca60ede'} 
          alt="Logo" 
          />
        </div>

        <nav className="header_nav">
          <ul className="header_ul">
            <li>
              <Link to="/" aria-current="page">Welcome</Link>
            </li>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/AboutUs">About Us</Link>
            </li>
          </ul>
        </nav>
      </div>

    {/* left header */}
      <div className="header_right">
        <div className="header_search">
          <input className="search_text" placeholder="Search..." required/>
          <button className="search_btn" title="Search"><FaSearch /></button>
        </div>
        <div className="header_login">
          <Link to="/Login" title="login"><FaUser /></Link>
        </div>
      </div>
    </header >
  );
}

