import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios";
import './PendingPostsStyle.css';
import SideBar from '../../components/SideBar/SideBar';
import MorViewPost from '../../components/MorViewPost/MorViewPost';
import {useNavigate} from "react-router-dom";

const fetchPendingPostsUrl = "http://localhost:8080/api/v1/manager/posts";

const PendingPosts = () => {
    const [selectedStatus, setSelectedStatus] = useState("None");
    const [selectedDay, setSelectedDay] = useState("Newest");
    const [gmail, setGmail] = useState("");
    const [myModPost, setMyModPost] = useState("false");
    const [posts, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const fetchPendingPosts = async (page, selectedStatus, gmail, selectedDay, myModPost) => {
        try {
            const response = await axios.get(fetchPendingPostsUrl, {
                params: {
                    pageNo: page,
                    status: selectedStatus,
                    gmail: gmail,
                    sortDate: selectedDay,
                    myModPost: myModPost
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setPost(response.data.obj);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.error("Error fetching pending posts:", error);
        }
    };
    useEffect(() => {
        fetchPendingPosts(page, selectedStatus, gmail, selectedDay, myModPost);
    }, [page, selectedStatus, gmail, selectedDay, myModPost]);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSelectStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleSelectDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleGmailChange = (event) => {
        setGmail(event.target.value);
    };

    const handleMyModPostChange = () => {
        setMyModPost(prevState => (prevState === "false" ? "true" : "false"));
    };

    const handleViewMoreClick = (post) => {
        navigate("/m/moderate/posts/details", { state: { post } });
    };

    return (
        <div className="PPM-container">
            <div className="PPM-main-content">
                <div className="MVP-search-container">
                    <div className="MVP-search-item">
                        <label htmlFor="searchGmail">Search gmail</label>
                        <input
                            id="searchGmail"
                            type="text"
                            placeholder="Search gmail"
                            value={gmail}
                            onChange={handleGmailChange}
                        />
                    </div>
                    <div className="MVP-search-item">
                        <label htmlFor="searchType">Status</label>
                        <select id="searchType" value={selectedStatus} onChange={handleSelectStatusChange}>
                            <option value="" hidden>Select Status</option>
                            <option value="Approving">Approving</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Transacted">Transacted</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                    <div className="MVP-search-item">
                        <label htmlFor="searchDate">Created Date</label>
                        <select id="searchDate" value={selectedDay} onChange={handleSelectDayChange}>
                            <option value="" hidden>Select Order</option>
                            <option value="newest">From newest date to oldest date</option>
                            <option value="oldest">From oldest date to newest date</option>
                        </select>
                    </div>
                </div>
                <h2>
                    <button
                        className={myModPost === "true" ? "button-on" : "button-off"}
                        onClick={handleMyModPostChange}
                    >
                        My moderate post
                    </button>
                </h2>
                <table>
                    <thead>
                    <tr>
                        <th>Gmail</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Create Date</th>
                        <th>Manager</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody className='report-record'>
                    {posts.length > 0 ? posts.map((post, index) => (
                        <tr key={index}>
                            <td>
                                <div className="email-info">
                                    <img
                                        src={post.customerViewDto?.avatar || "https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1"}
                                        alt="Avatar"
                                    />
                                    <div>
                                        <p>{post.customerViewDto?.cuserName || 'N/A'}</p>
                                        <p>{post.customerViewDto?.givenName || 'N/A'}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{post.title || 'N/A'}</td>
                            <td>{post.postStatus || 'N/A'}</td>
                            <td>{post.createAt || 'N/A'}</td>
                            <td>{post.managerFullName}</td>
                            <td>
                                <button
                                    className='PPM-ViewMore'
                                    onClick={() => handleViewMoreClick(post)}
                                >
                                    View more
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6">No posts found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                        Previous
                    </button>
                    <span style={{margin: '0 10px'}}>{page} / {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PendingPosts;
