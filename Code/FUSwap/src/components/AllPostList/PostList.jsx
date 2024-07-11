import axios from "axios";
import React, { useEffect, useState } from "react";
import './PostListStyle.css';
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:8080/api/v1/guest/posts";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const getAllPosts = async (page) => {
        try {
            const response = await axios.get(baseURL, {
                params: {
                    pageNo: page, 
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setPosts(response.data.obj);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                navigate('/not_found');
            } else {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        getAllPosts(page);
    }, [page]);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="post-list-container">
            <div className="post-grid">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <article className="post-card" key={post.postId} onClick={() => navigate(`/post/details/${post.postId}`)}>
                            <img
                                src={post.postImage}
                                alt="Post image"
                                className="post-image"
                            />
                            <h3 className="post-name">{post.title}</h3>
                            <p className="post-description">{post.content}</p>
                            <div className="post-price">
                                {post.isExchange ? (
                                    <>
                                        <span>Trade</span>
                                        
                                    </>
                                ) : (
                                    <>
                                        <span className="price-value">{post.unitPrice.toLocaleString()}</span>
                                        
                                    </>
                                )}
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="no-data">No data</div>
                )}
            </div>
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
    );
}
