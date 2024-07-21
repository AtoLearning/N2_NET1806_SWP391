import './UpdatePostStyle.css';
import { FaTimes } from 'react-icons/fa';
import {Link, useLocation} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export default function PostReadonly() {
    const location = useLocation();
    const { goodsPost } = location.state || {};

    return (
        <div className='post-contain'>
            <div className='post'>
                <div className="post-header">
                    <h1>Goods Post</h1>
                    <button className="post-close-button">
                        <Link to="/c/my-posts">
                            <FaTimes/>
                        </Link>
                    </button>
                </div>
                <div className="post-content">
                    <form className="post-form">

                        <div className="form-group form-input">
                            <p>Title:</p>
                            <input
                                className='input-text input-1'
                                value={goodsPost.title}
                                readOnly
                            />
                        </div>
                        <div className="form-group form-textarea">
                            <p>Description:</p>
                            <div className='box-textarea'>
                                <textarea
                                    className='input-text input-2'
                                    value={goodsPost.postContent}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="form-group image-category-address-group">
                            <div className="image-upload">
                                <div className="input-img">
                                    <p>Image:</p>
                                </div>
                                <div className="box-input-img"><img src={goodsPost.postImage} alt="Preview"/></div>
                            </div>
                            <div className="category-address">
                                <div className='box-select' style={{marginLeft: "-2%", marginBottom: "2%"}}>
                                    <p className="form-control select">Category: {goodsPost.categoryDto.cateName}</p>
                                </div>
                                <div className='box-address'>
                                    <p className='address-select select-3'
                                       style={{marginBottom: "5%"}}>Ward: {goodsPost.wardDto.wardName}</p>
                                    <p className='address-select select-3'
                                       style={{marginBottom: "5%"}}>District: {goodsPost.districtDto.districtName}</p>
                                    <p className='address-select select-3'
                                       style={{marginBottom: "5%"}}>City: {goodsPost.cityDto.cityName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group form-input">
                            <p>Street Number:</p>
                            <input
                                className='input-text input-1'
                                type='text'
                                value={goodsPost.streetNumber}
                                readOnly
                            />
                        </div>
                        <div className="form-group form-input">
                            <p>Street:</p>
                            <input
                                className='input-text input-2'
                                type='text'
                                value={goodsPost.street}
                                readOnly
                            />
                        </div>
                        <div className="form-group form-input">
                            <p>Reason for rejection:</p>
                            <input
                                className='input-text input-2'
                                type='text'
                                value={goodsPost.reason}
                                readOnly
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
