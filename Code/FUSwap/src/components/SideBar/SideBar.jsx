import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import { FaUser, FaBox, FaSignOutAlt, FaLaptop } from "react-icons/fa";
import '../SideBar/SideBarStyle.css'
import axios from "axios";
const baseUrl = "http://localhost:8080/api/v1/customer/permission/profile"
const baseURL = "http://localhost:8080/logout";
export default function SideBar() {
    const [selectedItem, setSelectedItem] = useState('');
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(baseUrl, {withCredentials: true });
                setProfile(response.data.obj);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfileData();
    }, []);
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };
    const handleLogout = () => {
        window.location.href = baseURL;
    };
    return (
        <nav className='sideBar'>
            <div className='profile'>
                <img
                    className=''
                    src={profile.avatar}
                    alt='avatar'
                />
                <span>{profile.nickname}</span>
            </div>
            <ul className='menu'>
                <li>
                    <Link
                        className={`menuItem ${selectedItem === 'Profile' ? 'active' : ''}`}
                        onClick={() => handleItemClick("Profile")}
                        to={"/c/my-profile"}
                    >
                        <FaUser className='menuIcon' />
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link
                        className={`menuItem ${selectedItem === 'Goods Post' ? 'active' : ''}`}
                        onClick={() => handleItemClick("Goods Post")}
                        to="/c/my-posts"
                    >
                        <FaLaptop className='menuIcon' />
                        <span>Goods Post</span>
                    </Link>
                </li>
                <li>
                    <Link
                        className={`menuItem ${selectedItem === 'Transaction' ? 'active' : ''}`}
                        onClick={() => handleItemClick("Transaction")}
                        to={"/c/my-transactions"}
                    >
                        <FaBox className='menuIcon' />
                        <span>Transaction</span>
                    </Link>
                </li>
                <li>
                    <Link className='menuItem' to="#" onClick={handleLogout}>
                        <FaSignOutAlt className='menuIcon' />
                        <span>Log Out</span>
                    </Link>
                </li>
            </ul>

        </nav>
    )
}
