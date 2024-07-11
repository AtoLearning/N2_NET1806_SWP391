import axios from "axios";
import { useEffect, useState } from 'react';
import { FaHandshake, FaMoneyBillWave } from "react-icons/fa";
import './PostInformStyle.css';
import RelatedGood from "../../components/RelatedGood/RelatedGood";
import UserInform from "../../components/UserInform/UserInform";
import {useNavigate, useParams} from "react-router-dom";

const baseUrl = "http://localhost:8080/api/v1/customer/post/details";

const PostInformSample = () => {
    const [detailsPost, setDetailsPost] = useState("");
    const { postId } = useParams();
    const navigate = useNavigate();

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
    }, [postId, navigate]);

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
                                <h1 className="product-name">{detailsPost.title}</h1>
                                <p className="description-label">Description:</p>
                                <p>{detailsPost.content}</p>
                                <p className="category-label">Category: {detailsPost.cateName}</p>
                                <button className="trade-button">{detailsPost.isExchange ? (
                                    <>
                                        <span>Trade </span>
                                        <span className="product-price"><FaHandshake /></span>
                                    </>
                                ) : (
                                    <>
                                        <span>{detailsPost.unitPrice} </span>
                                        <span className="product-price"><FaMoneyBillWave /></span>
                                    </>
                                )}</button>
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
                />
            )}
            <RelatedGood relatedGoods={detailsPost.relatedGoods} />
        </section>
    );
};
export default PostInformSample;
