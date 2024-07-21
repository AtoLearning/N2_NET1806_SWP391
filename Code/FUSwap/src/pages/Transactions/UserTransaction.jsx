 import axios from "axios";
import React, { useEffect, useState } from 'react';
import { FaHandshake, FaMoneyBillWave } from "react-icons/fa";
import './UserTransactionStyle.css';
import SideBar from '../../components/SideBar/SideBar';
 import {useLocation} from "react-router-dom";
const apiUrl = "http://localhost:8080/api/v1/guest/post/1"; // URL API để lấy dữ liệu bài đăng thực tế

const PostInformSample = () => {
    const location = useLocation();
    const { transaction } = location.state || {};

    return (
        <section className="product-container1">
            <div className='post-left'>
                <SideBar />
            </div>

            <div className="post-right">

                <div className="product-card-PostInform1">
                    <div className="transaction-header">
                        <div className="transaction-id">
                            <p><span className="bold">TransID</span>: {transaction.transId}</p>
                        </div>
                        <div className="transaction-title">
                            <h2>Transaction</h2>
                        </div>
                        <div className="transaction-date">
                            <p><span className="bold">Date of transaction</span>: {transaction.creatAt}</p>
                        </div>
                    </div>
                    <div className="seller-total-container">
                        <div className="buyer-info">
                            <p><span className="bold">Consumer Information</span>: </p>
                            <p>{transaction.consumer.givenName}</p>
                            <p><span className="bold">Email</span>:</p>
                            <p>{transaction.consumer.cuserName}</p>
                            <p><span className="bold">Phone number</span>:</p>
                            <p> {transaction.consumer.phone}</p>
                        </div>

                        <div className="seller-info">
                            <p><span className="bold">Supplier Information</span>:</p>
                            <p>{transaction.supplier.givenName}</p>
                            <p><span className="bold">Email</span>:</p>
                            <p>{transaction.supplier.cuserName}</p>
                            <p><span className="bold">Phone number</span>: </p>
                            <p> {transaction.supplier.phone}</p>
                        </div>
                    </div>
                    <hr />

                    <div className="product-border1">
                        <div className="product-content1">
                            <div className="image-column1">
                                <img
                                    loading="lazy"
                                    src={transaction.goodsPostViewDto.postImage}
                                    className="product-image1"
                                    alt="Product"
                                />
                            </div>
                            <div className="info-column1">
                                <div className="product-info1">
                                    <h1 className="product-name1">{transaction.goodsPostViewDto.title}</h1>
                                    <p className="description-label1"><span className="bold">Description</span>:</p>
                                    <p>{transaction.goodsPostViewDto.content}</p>

                                    <p className="Adress-label1"><span className="bold">Address: </span>:  {transaction.goodsPostViewDto.streetNumber} {transaction.goodsPostViewDto.street}, {transaction.goodsPostViewDto.wardName}, {transaction.goodsPostViewDto.districtName}, {transaction.goodsPostViewDto.cityName}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PostInformSample;
