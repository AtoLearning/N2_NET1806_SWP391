import React from "react";
import { Link } from "react-router-dom"
import './HeaderStyle.css';
import { FaSearch, FaUser } from "react-icons/fa";
import SearchBox from '../SearchBox/SearchBox'

export default function Header() {
  return (
    <header className="header">
      {/* left header */}
      <div className="header_left">
        <div>
          <img
            className="img_logo"
            src={'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FLogo.png?alt=media&token=41e1c9b7-40bb-4b39-bf2c-ef09ab512ceb'}
            alt="Logo"
          />
        </div>

        <nav className="header_nav">
          <ul className="header_ul">
            <li>
              <Link to="/" aria-current="page">Welcome</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* left header */}
      <div className="header_right">
        <SearchBox />
        <div className="header_role">
          <Link to="/role" title="role"><FaUser /></Link>
        </div>
      </div>
    </header >
  );
}

