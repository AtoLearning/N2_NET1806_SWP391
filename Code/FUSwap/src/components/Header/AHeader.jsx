import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from "@nextui-org/react";
import React from 'react'
import { Link } from "react-router-dom"
import './HeaderStyle.css';
const logoutURL = "http://localhost:8080/logout";
export default function AHeader() {
    const handleLogout = () => {
        window.location.href = logoutURL;
    };
    return (
        <header className="header">
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
            <div className="header_right">
                <Dropdown backdrop="blur">
                    <DropdownTrigger>
                        <button>
                            <img
                                className="img_avatar"
                                src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1'
                                alt='avatar'
                            />
                        </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions">
                        <DropdownItem key="UserInfo">
                            <Link to="/m/my_profile">
                                Profile
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="ManageAccount">
                            <Link to="#">
                                Manager Account
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="ManagePost">
                            <Link to="#">
                                Manage Post
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="ManageReport">
                            <Link to="#">
                                Manage Report
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="LogOut">
                            <Link to="#" onClick={handleLogout}>
                                Log out
                            </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>
    )
}
