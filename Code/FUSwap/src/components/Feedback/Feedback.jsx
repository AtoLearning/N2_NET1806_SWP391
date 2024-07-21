import './FeedbackStyle.css';
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";

const initialState = {
    postId: 0,
    feedbackContent: ""
}

const error_init = {
    feedbackContent_err: '',
}

const baseUrl = "http://localhost:8080/api/v1/customer/permission/feedback/create";
const Feedback = ({ show, onClose, trans }) => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const [errors, setErrors] = useState(error_init);
    if (!show || !trans) return null;

    const createFeedback = async (data) => {
        try {
            const response = await axios.post(baseUrl, data, {withCredentials: true, responseType: "json"});
            if (response.status === 201) {
                toast.success(response.data.message);
                navigate('/c/my-transactions');
            }
        }catch(error) {
            if(error.response) {
                console.log(error);
                if(error.response.data.status === '400.1') {
                    toast.error(
                        <div>
                            <p><Link to="/c/profile" className="toast-rainbow-link">{error.response.data.message}</Link></p>
                        </div>
                    );
                } else if (error.response.data.status === '400') {
                    toast.error(error.response.data.message)
                }
            }
        }
    }

    const handleBackClick = (event) => {
        event.preventDefault();
        onClose();
    };

    const handleTextareaClick = (event) => {
        event.stopPropagation();
    };

    const handleTextareaChange = (event) => {
        setState({
            ...state,
            feedbackContent: event.target.value,
            postId: trans.goodsPostViewDto.postId
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            createFeedback(state);
        }
    }

    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (!(5 <= state.feedbackContent.trim().length && state.feedbackContent.trim().length <= 200)) {
            errors.feedbackContent_err = 'Content must be between 5 and 200 characters long';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    return (
        <div className="fb-overlay">
            <div className='fb-contain' onClick={(e) => e.stopPropagation()}>
                <div className="fb-content">
                    <h2>Feedback</h2>
                    <div className="post-info-fb">
                        <img
                            src={trans.goodsPostViewDto.postImage}
                            alt="Product"
                        />
                        <p>{trans.goodsPostViewDto.title}</p>
                    </div>
                    <form className='post-feedback' onSubmit={handleSubmit}>
                        <textarea className='fb-textarea'
                                  placeholder="Please share what you like about this product..."
                                  name='feedbackContent'
                                  value={state.feedbackContent}
                                  onClick={handleTextareaClick}
                                  onChange={handleTextareaChange}
                                  required
                        />
                        {errors.feedbackContent_err &&
                            <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>
                                {errors.feedbackContent_err}
                            </span>}
                        <div className="modal-buttons">
                            <button className='back-btn' onClick={handleBackClick}>Back</button>
                            <button className='complete-btn' type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

Feedback.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    trans: PropTypes.shape({
        goodsPostViewDto: PropTypes.shape({
            postImage: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            postId: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
};

export default Feedback;
