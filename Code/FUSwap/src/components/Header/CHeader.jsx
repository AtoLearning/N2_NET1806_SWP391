import {Dropdown, DropdownMenu, DropdownTrigger, DropdownItem} from "@nextui-org/react";
import { Link } from "react-router-dom"
import SearchBox from '../SearchBox/SearchBox'
import './HeaderStyle.css';
import {useEffect, useState} from "react";
import axios from "axios";

const baseURL = "http://localhost:8080/logout";
const baseUrl = "http://localhost:8080/api/v1/customer/permission/profile"
export default function CHeader() {
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

    const handleLogout = () => {
        window.location.href = baseURL;
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
                            <Link to="/home" aria-current="page"><span>Home</span></Link>
                        </li>
                        <li>
                            <Link to=""><span>Trade</span></Link>
                        </li>
                        <li>
                            <Link to=""><span>Sell</span></Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="header_right">
                <SearchBox />
                <Dropdown backdrop="blur">
                    <DropdownTrigger>
                        <button>
                            <img
                                className="img_avatar"
                                src={profile.avatar}
                                alt='avatar'
                            />
                        </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions">
                        <DropdownItem key="UserInfo">
                            <Link to="/c/my-profile">
                                Profile
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="TheOrders">
                            <Link to="/c/my-posts">
                                Goods Post
                            </Link>
                        </DropdownItem>
                        <DropdownItem key="MyTransctions">
                            <Link to="/c/my-transactions">
                                Transaction
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
