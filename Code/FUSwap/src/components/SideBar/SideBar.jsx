import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaUser, FaTicketAlt, FaBox, FaSignOutAlt, FaCaretDown } from "react-icons/fa";
import '../SideBar/SideBarStyle.css'

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const toggleAccount = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const isSubItemSelected = ['My Profile', 'My Post', 'My Coin'].includes(selectedItem);

    return (
        <nav className='sideBar'>
            <div className='profile'>
                <img
                    className=''
                    src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1'
                    alt='avatar'
                />
                <span>NickName</span>
            </div>
            <ul className='menu'>
                <li>
                    <div className={`menuItem ${isSubItemSelected ? 'active' : ''}`} onClick={toggleAccount} to={"#"}>
                        <FaUser className='menuIcon user' />
                        <span className='down'>My Account <FaCaretDown className={`downIcon menuIcon ${isOpen ? 'open' : ''}`} /></span>
                    </div>
                    {isOpen && (
                        <ul className='subMenu'>
                            <li>
                                <Link
                                    className={`subMenuItem ${selectedItem === 'My Profile' ? 'active' : ''}`}
                                    onClick={() => handleItemClick("My Profile")}
                                    to={"/my-profile"}
                                >
                                    <span>My Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`subMenuItem ${selectedItem === 'My Post' ? 'active' : ''}`}
                                    onClick={() => handleItemClick("My Post")}
                                    to="/my-post"
                                >
                                    <span>My Post</span>
                                </Link>
                            </li>
                            <li onClick={() => handleItemClick("My Coin")}>
                                <Link
                                    className={`subMenuItem ${selectedItem === 'My Coin' ? 'active' : ''}`}
                                    onClick={() => handleItemClick("My Coin")}
                                    to={""}
                                >
                                    <span>My Coin</span>
                                </Link>
                            </li>
                        </ul>
                    )}

                </li>
                <li>
                    <Link 
                    className={`menuItem ${selectedItem === 'The Orders' ? 'active' : ''}`}
                    onClick={() => handleItemClick("The Orders")}
                    to={"/the_orders"}
                    >
                        <FaBox className='menuIcon' />
                        <span>The Orders</span>
                    </Link>
                </li>
                <li>

                    <Link 
                    className={`menuItem ${selectedItem === 'The Voucher' ? 'active' : ''}`}
                    onClick={() => handleItemClick("The Voucher")}
                    to={""}
                    >
                        <FaTicketAlt className='menuIcon' />
                        <span>The Voucher</span>
                    </Link>
                </li>
                <li>
                    <Link className='menuItem' to={""}>
                        <FaSignOutAlt className='menuIcon' />
                        <span>Log Out</span>
                    </Link>
                </li>
            </ul>

        </nav>
    )
}
