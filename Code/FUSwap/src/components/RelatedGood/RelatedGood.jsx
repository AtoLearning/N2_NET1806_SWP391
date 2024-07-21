import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatedGoodStyle.css';

const apiUrl = "http://localhost:8080/api/v1/customer/post/details/related-goods";

const RelatedGood = ({postId, cateName, cuserName}) => {
    const itemsPerPage = 4;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProducts = async (postId, cateName, cuserName) => {
        setPosts([]);
        try {
            const response = await axios.get(apiUrl, {
                params: {
                    postId: postId,
                    cateName: cateName,
                    cuserName: cuserName
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setPosts(response.data.obj);
                console.log(response.data.obj);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts(postId, cateName, cuserName);
    }, [postId, cateName, cuserName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const visiblePosts = posts.slice(0, itemsPerPage);

    const handleProductClick = (postId) => {
        navigate(`/c/post/details/${postId}`);
    };

    return (
        <div className="related-goods-containersss">
            <h3 className="related-goods-title">Related goods</h3>
            <div className="related-goods-container">
                <div className="related-goods-grid">
                    {visiblePosts && visiblePosts.map((post) => (
                        <div className="product-column" key={post.postId} onClick={() => handleProductClick(post.postId)}>
                            <div className="product-card-wrapper">
                                <img
                                    loading="lazy"
                                    src={post.postImage}
                                    className="product-image-small"
                                    alt="Related product"
                                />
                                <p className="product-type">{post.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedGood;
