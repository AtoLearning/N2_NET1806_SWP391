import axios from "axios";
import React, { useEffect, useState } from "react";
import './PostListStyle.css';
import { FaHandshake, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const baseURL = "http://localhost:8080/api/v1/guest/posts/search";

export default function AfterSearchPost({ searchValue, cityName, districtName, wardName, priceSort, dateSort, postType, cateName }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const getAllPosts = async (page, searchValue, cityName, districtName, wardName, priceSort, dateSort, postType, cateName) => {
        try {
            const response = await axios.get(baseURL, {
                params: {
                    pageNo: page,
                    searchValue: searchValue,
                    cityName: cityName,
                    districtName: districtName,
                    wardName: wardName,
                    priceSort: priceSort,
                    dateSort: dateSort,
                    postType: postType,
                    cateName: cateName,
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
        getAllPosts(page, searchValue, cityName, districtName, wardName, priceSort, dateSort, postType, cateName);
    }, [page, searchValue, cityName, districtName, wardName, priceSort, dateSort, postType, cateName]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="post-list-container">
            <div className="post-grid">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post, index) => (
                        <article className="post-card" key={index} onClick={() => navigate(`/c/post/details/${post.postId}`)}>
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
                                        <span>{post.unitPrice.toLocaleString()} VND</span>
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
AfterSearchPost.propTypes = {
    searchValue: PropTypes.string.isRequired,
    cityName: PropTypes.string.isRequired,
    districtName: PropTypes.string.isRequired,
    wardName: PropTypes.string.isRequired,
    priceSort: PropTypes.string.isRequired,
    dateSort: PropTypes.string.isRequired,
    postType: PropTypes.string.isRequired,
    cateName: PropTypes.string.isRequired,
};
