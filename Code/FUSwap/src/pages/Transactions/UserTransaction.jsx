 import axios from "axios";
import React, { useEffect, useState } from 'react';
import { FaHandshake, FaMoneyBillWave } from "react-icons/fa";
import './UserTransactionStyle.css';
import SideBar from '../../components/SideBar/SideBar';
const apiUrl = "http://localhost:8080/api/v1/guest/post/1"; // URL API để lấy dữ liệu bài đăng thực tế

const PostInformSample = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [useSampleData, setUseSampleData] = useState(true); // State để kiểm tra có sử dụng dữ liệu mẫu hay không

    // Dữ liệu mẫu
    const sampleData = {
        id: '12345678910',
        title: 'Name\' goods',
        createDate: '99/99/9999',
        description: 'This is a sample post description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        category: 'Sample Category',
        isExchange: true,
        unitPrice: 30000,
        gmail: 'abcdefghtqSE17xxxx@fpt.edu.vn',
        phomeNumber: '01234567890',
        student: {
            name: 'Nguyen Nguyen Nguyen Anh Nguyen',
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
        <section className="product-container1">
            <div className='post-left'>
                <SideBar />
            </div>

            <div className="post-right">

                <div className="product-card-PostInform1">
                    <div className="transaction-header">
                        <div className="transaction-id">
                            <p><span className="bold">TransID</span>: {post.id}</p>
                        </div>
                        <div className="transaction-title">
                            <h2>Transaction</h2>
                        </div>
                        <div className="transaction-date">
                            <p><span className="bold">Date of transaction</span>: {post.createDate}</p>
                        </div>
                    </div>
                    <div className="seller-total-container">
                        <div className="buyer-info">
                            <p><span className="bold">Customer Information</span>: </p>
                            <p>{post.student.name}</p>
                            <p><span className="bold">Email</span>:</p>
                            <p>{post.gmail}</p>
                            <p><span className="bold">Phone number</span>:</p>
                            <p> {post.phomeNumber}</p>
                        </div>

                        <div className="seller-info">
                            <p><span className="bold">Supplier Information</span>:</p>
                            <p>{post.student.name}</p>
                            <p><span className="bold">Email</span>:</p>
                            <p>{post.gmail}</p>
                            <p><span className="bold">Phone number</span>: </p>
                            <p> {post.phomeNumber}</p>
                        </div>
                    </div>
                    <hr />

                    <div className="product-border1">
                        <div className="product-content1">
                            <div className="image-column1">
                                <img
                                    loading="lazy"
                                    src={post.image}
                                    className="product-image1"
                                    alt="Product"
                                />
                            </div>
                            <div className="info-column1">
                                <div className="product-info1">
                                    <h1 className="product-name1">{post.title}</h1>
                                    <p className="description-label1"><span className="bold">Description</span>:</p>
                                    <p>{post.description}</p>

                                    <p className="Adress-label1"><span className="bold">Adress post</span>:  Phường Bình Hưng Hòa B, Quận Bình Tân, Thành Phố Hồ Chí Minh</p>

                                </div>
                            </div>
                        </div>
                        <div className="total-price1">
                            {post.isExchange ? (
                                <>
                                <p><span className="bold">Trade</span></p>
                                
                                </>
                            ) : (
                                <>
                                <p><span className="bold">Total Price</span>: 1234567891011</p>
                                
                                </>
                            )


                            }
                            
                            </div>
                    </div>

                    
                </div>
            </div>
        </section>
    );
};

export default PostInformSample;
