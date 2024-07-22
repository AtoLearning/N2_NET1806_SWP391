import React, { useState } from 'react';
import '../../components/Report/ReportStyle.css';
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Feedback from "../Feedback/Feedback.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebaseConfig.js";
import { v4 } from "uuid";

const initialState = {
    reportId: 0,
    title: '',
    content: '',
    reportImage: '',
    reportStatus: '',
    postId: 0,
    postTitle: '',
    postImage: '',
}

const error_init = {
    title_err: '',
    content_err: '',
}

const baseUrl = "http://localhost:8080/api/v1/customer/permission/report/create";

const Report = ({ show, onClose, trans }) => {

    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const [errors, setErrors] = useState(error_init);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState("");
    if (!show || !trans) return null;

    const updateImage = () => {
        return new Promise((resolve, reject) => {
            if (image == null) {
                resolve('');
                return;
            }
            const imageRef = ref(storage, `images/${image.name + v4()}`);
            uploadBytes(imageRef, image)
                .then(snapshot => getDownloadURL(snapshot.ref))
                .then(url => {
                    console.log("Image URL:", url);
                    resolve(url);
                })
                .catch(error => {
                    console.error("Error uploading image:", error);
                    reject(error);
                });
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setImageURL(URL.createObjectURL(file));
    };

    const createReport = async (data) => {
        try {
            const response = await axios.post(baseUrl, data, { withCredentials: true, responseType: "json" });
            if (response.status === 201) {
                toast.success(response.data.message);
                navigate('/c/my-transactions');
            }
        } catch (error) {
            if (error.response) {
                console.log(error);
                if (error.response.data.status === '400.1') {
                    toast.error(
                        <div>
                            <p><Link to="/c/profile" className="toast-rainbow-link">{error.response.data.message}</Link></p>
                        </div>
                    );
                } else if (error.response.data.status === '400') {
                    toast.error(error.response.data.message);
                }
            }
        }
    };

    const handleBackClick = (event) => {
        event.stopPropagation();
        onClose();
    };

    const handleClick = (event) => {
        event.stopPropagation();
    };

    const handleTextareaChange = (event) => {
        setState({
            ...state,
            content: event.target.value,
        });
    };

    const handleInputChange = (event) => {
        setState({
            ...state,
            title: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            updateImage().then(url => {
                const newState = { ...state, reportImage: url, reportStatus: 'Approving', postId: trans.goodsPostViewDto.postId };
                console.log(newState);
                createReport(newState);
            }).catch(error => {
                console.log(error);
            });
        }
    };

    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (!(5 <= state.title.trim().length && state.title.trim().length <= 50)) {
            errors.title_err = 'Title must be between 5 and 50 characters long';
            isValid = false;
        }

        if (!(10 <= state.content.trim().length && state.content.trim().length <= 200)) {
            errors.content_err = 'Content must be between 10 and 200 characters long';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    return (
        <div className='report-overlay'>
            <div className='report-contain'>
                <div className='report-content' >
                    <h2>Report</h2>
                    <div className='post-info-rp' onClick={handleClick}>
                        <img
                            src={trans.goodsPostViewDto.postImage}
                            alt="Product"
                        />
                        <p>{trans.goodsPostViewDto.title}</p>
                    </div>
                    <form className='post-report' onSubmit={handleSubmit}>
                        <div className='sub-content sub-1'>
                            <label>Title:
                                {errors.title_err &&
                                    <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>
                                        {errors.title_err}
                                    </span>}
                            </label>
                            <input
                                type='text'
                                name='title'
                                value={trans.goodsPostViewDto.reportManageDto?.title || state.title}
                                onChange={handleInputChange}
                                onClick={handleClick}
                                required
                            />
                        </div>
                        <div className='sub-content sub-2'>
                            <label>Description:
                                {errors.content_err &&
                                    <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>
                                        {errors.content_err}
                                    </span>}
                            </label>
                            <textarea
                                placeholder='Write down what you want to report...'
                                name='content'
                                value={trans.goodsPostViewDto.reportManageDto?.content || state.content}
                                onClick={handleClick}
                                onChange={handleTextareaChange}
                                required
                            />
                        </div>
                        <div className='sub-3'>
                            {trans.goodsPostViewDto.reportManageDto == null ? (
                                <>
                                    <div className='sub-3-content'>
                                        <input
                                            type='file'
                                            name='reportImage'
                                            onChange={handleImageChange}
                                            onClick={handleClick}
                                            required
                                        />
                                    </div>
                                    <div
                                        onClick={handleClick}>
                                        <img src={imageURL}
                                             onClick={handleClick}
                                             alt="Preview"/>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='sub-3-content'>
                                        <input
                                            type='file'
                                            name='reportImage'
                                            onChange={handleImageChange}
                                            onClick={handleClick}
                                            style={{display: "none"}}
                                            required
                                        />
                                    </div>
                                    <div
                                        onClick={handleClick}>
                                        <img src={trans.goodsPostViewDto.reportManageDto.reportImage}
                                             onClick={handleClick}
                                             alt="Preview"/>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="modal-buttons">
                            <button className='back-btn' onClick={handleBackClick}>Back</button>
                            {trans.goodsPostViewDto.reportManageDto == null && (
                                <button className='complete-btn' onClick={handleClick} type='submit'>Submit</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

Report.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    trans: PropTypes.shape({
        goodsPostViewDto: PropTypes.shape({
            postImage: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            postId: PropTypes.number.isRequired,
            reportManageDto: PropTypes.object,
        }).isRequired,
    }).isRequired,
};

export default Report;
