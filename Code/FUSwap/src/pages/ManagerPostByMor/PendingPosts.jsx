import React, { useState, useEffect } from 'react';
import axios from "axios";
import './PendingPostsStyle.css';
import SideBar from '../../components/SideBar/SideBar';
import MorViewPost from '../../components/MorViewPost/MorViewPost';

const fetchPendingPostsUrl = "http://localhost:8080/api/v1/your-api-endpoint/pending";

const PendingPosts = () => {
    const [pendingPosts, setPendingPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sortType, setSortType] = useState('');
    const [sortDate, setSortDate] = useState('');
    const [searchEmail, setSearchEmail] = useState('');

    const fetchPendingPosts = async (page) => {
        try {
            const response = await axios.get(fetchPendingPostsUrl, {
                params: {
                    pageNo: page,
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setPendingPosts(response.data.obj);
                setFilteredPosts(response.data.obj); // Initialize filteredPosts with the fetched data
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.error("Error fetching pending posts:", error);
        }
    };

    useEffect(() => {
        const samplePosts = [
            { email: 'anh123se17xxxx@fpt.edu.vn', name: 'Nguyen Nguyen Nguyen Nguyen', title: 'ABCDE FGHI AAAAA BB ...', type: 'Trade', date: '99/99/9999' },
            { email: 'anh124se17xxxx@fpt.edu.vn', name: 'Nguyen Nguyen 2', title: 'ABCDE FGHI AAAAA BB ...', type: 'Trade', date: '99/99/9999' },
            { email: 'anh125se17xxxx@fpt.edu.vn', name: 'Nguyen Nguyen 3', title: 'ABCDE FGHI AAAAA BB ...', type: 'Trade', date: '99/99/9999' },
            { email: 'anh125se17xxxx@fpt.edu.vn', name: 'Nguyen Nguyen 4', title: 'ABCDE FGHI AAAAA BB ...', type: 'Trade', date: '99/99/9999' },
            { email: 'anh123se17xxxx@fpt.edu.vn', name: 'Nguyen Nguyen 5', title: 'ABCDE FGHI AAAAA BB ...', type: 'Trade', date: '99/99/9999' },
            { email: 'anh123se17xxxx@fpt.edu.vn', name: 'Nguyen Nguyen 6', title: 'ABCDE FGHI AAAAA BB ...', type: 'Trade', date: '99/99/9999' },
            { email: 'anh123se17xxxx@fpt.edu.vn', name: 'Nguyen Nguyen 7', title: 'ABCDE FGHI AAAAA BB ...', type: 'Trade', date: '99/99/9999' },
            { email: 'anh123se17xxxx@fpt.edu.vn', name: 'Nguyen Nguyen 8', title: 'ABCDE FGHI AAAAA BB ...', type: 'Trade', date: '99/99/9999' },
            { email: 'anh123se17xxxx@fpt.edu.vn', name: 'Nguyen Nguyen 9', title: 'ABCDE FGHI AAAAA BB ...', type: 'Trade', date: '99/99/9999' },
            { email: 'anh123se17xxxx@fpt.edu.vn', name: 'Nguyen Nguyen 10', title: 'ABCDE FGHI AAAAA BB ...', type: 'Trade', date: '99/99/9999' }
        ];
        setPendingPosts(samplePosts);
        setFilteredPosts(samplePosts); // Initialize filteredPosts with the sample data
        setTotalPages(Math.ceil(samplePosts.length / 8));
    }, []);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSearchChange = (value, type) => {
        if (type === 'email') {
            setSearchEmail(value);
            const filtered = pendingPosts.filter(post => post.email.includes(value));
            setFilteredPosts(filtered);
            setPage(1);
            setTotalPages(Math.ceil(filtered.length / 8));
        }
    };

    const handleSortChange = (value, type) => {
        if (type === 'type') {
            setSortType(value);
        } else if (type === 'date') {
            setSortDate(value);
        }
    };

    const sortedPosts = [...filteredPosts]
        .filter(post => (sortType ? post.type === sortType : true))
        .sort((a, b) => {
            if (sortDate === 'newest') {
                return new Date(b.date) - new Date(a.date);
            } else if (sortDate === 'oldest') {
                return new Date(a.date) - new Date(b.date);
            }
            return 0;
        });

    return (
        <div className="PPM-container">
            <div className="PPM-sidebar">
                <SideBar />
            </div>
            <div className="PPM-main-content">
                <MorViewPost onSearchChange={handleSearchChange} onSortChange={handleSortChange} />
                <h2>Pending Posts</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Gmail</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Create Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPosts.slice((page - 1) * 8, page * 8).map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="email-info">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1" alt="Avatar" />
                                        <div>
                                            <p>{item.email}</p>
                                            <p>{item.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.title}</td>
                                <td>{item.type}</td>
                                <td>{item.date}</td>
                                <td><a className='PPM-ViewMore' href="#">View more</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                        Previous
                    </button>
                    <span style={{ margin: '0 10px' }}>{page} / {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PendingPosts;
