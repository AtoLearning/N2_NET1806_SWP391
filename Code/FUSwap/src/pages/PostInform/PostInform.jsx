import axios from "axios";
import React, { useEffect, useState } from 'react';
import { FaHandshake, FaMoneyBillWave } from "react-icons/fa";
import './PostInformStyle.css';
import RelatedGood from "../../components/RelatedGood/RelatedGood";
import UserInform from "../../components/UserInform/UserInform";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const baseUrl = "http://localhost:8080/api/v1/customer/post/details";
const urlToMakeTrans = "http://localhost:8080/api/v1/customer/permission/trans/create";

const PostInformSample = () => {
    const [detailsPost, setDetailsPost] = useState({});
    const { postId } = useParams();
    const navigate = useNavigate();
    const [specialPostId, setSpecialPostId] = useState("");
    const [mesg, setMesg] = useState("");
    const [feedbackPage, setFeedbackPage] = useState(1);

    useEffect(() => {
        const getDetailsPost = async (postId) => {
            try {
                const response = await axios.get(`${baseUrl}/${postId}`, {
                    withCredentials: true
                });
                if (response.status === 200) {
                    setDetailsPost(response.data.obj);
                }
            } catch (error) {
                console.log(error);
                if(error.response && error.response.status === 401) {
                    navigate("/role");
                }
            }
        };
        getDetailsPost(postId);
        setFeedbackPage(1);
        window.scrollTo(0, 0);
    }, [postId, navigate]);

    const makeTransaction = async (postId, specialPostId) => {
        try {
            const response = await axios.post(`${urlToMakeTrans}/${postId}/${specialPostId}`, "",{withCredentials: true})
            if (response.status === 201) {
                setMesg(response.data.obj);
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            if(error.response && error.response.status === 401) {
                navigate("/role");
            }
            toast.error(error.response.data.message)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSpecialPostId(event.target.value);
        makeTransaction(postId, specialPostId);

    };

    const handleInputChange = (e) => {
        setSpecialPostId(e.target.value);
    };

    return (
        <section className="product-container">
            <article className="product-card-PostInform">
                <div className="product-border">
                    <div className="product-content">
                        <div className="image-column">
                            <img
                                loading="lazy"
                                src={detailsPost.postImage}
                                className="product-image"
                                alt="Product"
                            />
                        </div>

                        <div className="info-column">
                            <div className="product-info">
                                <div className="PostInform-header">
                                    <h1 className="product-name">{detailsPost.title}</h1>
                                    <form className='search-special-id' onSubmit={handleSubmit}>
                                        <input
                                            className='input-special-id'
                                            type='text'
                                            name='specialPostId'
                                            value={specialPostId}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <p>PostID</p>
                                        <button className='special-box-symbol-img' type='submit'>
                                            <img
                                                className='special-symbol-img'
                                                src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FSymbol.png?alt=media&token=e4b817f4-8816-4106-8649-7c8560029868'
                                                alt='symbol'
                                            />
                                        </button>
                                    </form>
                                </div>
                                
                                <div className="product-details">
                                    <div className="product-description">
                                        <p className="description-label" style={{fontWeight: "bold"}}>&ensp;Description:</p>
                                        <p>{detailsPost.content}</p>
                                        <p className="category-label">&ensp;<span style={{fontWeight: "bold"}}>Category:&ensp;</span> {detailsPost.cateName}</p>
                                        <p className="description-label" style={{fontWeight: "bold"}}>&ensp;Address: </p>
                                        <p className="description-label">{detailsPost.streetNumber} {detailsPost.street}
                                            , {detailsPost.wardName}, {detailsPost.districtName}, {detailsPost.cityName}
                                        </p>
                                    </div>
                                </div>

                                <div className="PostInform-button">
                                <button className="PostInform-trade-button">{detailsPost.isExchange ? (
                                    <>
                                        <span>Trade</span>
                                        
                                    </>
                                ) : (
                                    <>
                                        <span>{detailsPost.unitPrice?.toLocaleString() || 'N/A'} VND</span>

                                    </>
                                )}</button>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            {detailsPost.customerViewDto && (
                <UserInform
                    customerViewDto={detailsPost.customerViewDto}
                    streetNumber={detailsPost.streetNumber}
                    street={detailsPost.street}
                    wardName={detailsPost.wardName}
                    districtName={detailsPost.districtName}
                    cityName={detailsPost.cityName}
                    feedbackPage={feedbackPage}
                    setFeedbackPage={setFeedbackPage}
                />
            )}
            {detailsPost.customerViewDto && (
                <RelatedGood
                    postId={detailsPost.postId}
                    cateName={detailsPost.cateName}
                    cuserName={detailsPost.customerViewDto.cuserName}
                />
            )}
        </section>
    );
};
export default PostInformSample;
