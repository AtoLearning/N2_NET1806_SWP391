import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from "@nextui-org/react";
import React from 'react'
import { Link } from "react-router-dom"
import SearchBox from '../SearchBox/SearchBox'
import './HeaderStyle.css';

export default function CHeader() {
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
                            <Link to="/home" aria-current="page"><span>Post</span></Link>
                        </li>
                        <li>
                            <Link to=""><span>Report</span></Link>
                        </li>
                        <li>
                            <Link to=""><span>Account</span></Link>
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
                                My Profile
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="LogOut">
                            <Link to="">
                                Log out
                            </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>
    )
}
