import axios from "axios";
import React, { useEffect, useState } from 'react';
import { FaHandshake, FaMoneyBillWave } from "react-icons/fa";
import './PostInformStyle.css';
import RelatedGood from "../../components/RelatedGood/RelatedGood";
import UserInform from "../../components/UserInform/UserInform";
const apiUrl = "http://localhost:8080/api/v1/guest/post/1"; // URL API để lấy dữ liệu bài đăng thực tế

const PostInformSample = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [useSampleData, setUseSampleData] = useState(true); // State để kiểm tra có sử dụng dữ liệu mẫu hay không

    // Dữ liệu mẫu
    const sampleData = {
        id: '1',
        title: 'Name\' goods',
        description: 'This is a sample post description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        category: 'Sample Category',
        isExchange: false,
        unitPrice: 30000,
        student: {
            name: 'Student\'s name',
            score: '.......'
        },
        image: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FSymbol.png?alt=media&token=e4b817f4-8816-4106-8649-7c8560029868',
        studentAvatar: 'https://via.placeholder.com/100x100.png?text=Avatar',
        relatedGoods: [
            { image: 'https://via.placeholder.com/100x100.png?text=Product1', type: 'Trade' },
            { image: 'https://via.placeholder.com/100x100.png?text=Product2', type: 'Sell' },
            { image: 'https://via.placeholder.com/100x100.png?text=Product3', type: 'Trade' }
        ]
    };

    useEffect(() => {
        const fetchPost = async () => {
            if (useSampleData) {
                // Sử dụng dữ liệu mẫu và đặt loading thành false
                setPost(sampleData);
                setLoading(false);
            } else {
                try {
                    const response = await axios.get(apiUrl, {
                        withCredentials: true
                    });
                    if (response.status === 200) {
                        setPost(response.data);
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPost();
    }, [useSampleData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="product-container">
            <article className="product-card-PostInform">
                <div className="product-border">
                    <div className="product-content">
                        <div className="image-column">
                            <img
                                loading="lazy"
                                src={post.image}
                                className="product-image"
                                alt="Product"
                            />
                        </div>
                        <div className="info-column">
                            <div className="product-info">
                                <h1 className="product-name">{post.title}</h1>
                                <p className="description-label">Description:</p>
                                <p>{post.description}</p>
                                <p className="category-label">Category: {post.category}</p>
                                <button className="trade-button">{post.isExchange ? (
                                    <>
                                        <span>Trade </span>
                                        <span className="product-price"><FaHandshake /></span>
                                    </>
                                ) : (
                                    <>
                                        <span>{post.unitPrice} </span>
                                        <span className="product-price"><FaMoneyBillWave /></span>
                                    </>
                                )}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="student-info">
                    <img
                        loading="lazy"
                        src={post.studentAvatar}
                        className="student-avatar"
                        alt="Student avatar"
                    />
                    <div className="student-details">
                        <h2 className="student-name">{post.student.name}</h2>
                        <p className="student-score">score: {post.student.score}</p>
                    </div>
                </div> */}
            </article>
            <UserInform/>   
            <RelatedGood relatedGoods={post.relatedGoods} />
        </section>
    );
};

export default PostInformSample;
