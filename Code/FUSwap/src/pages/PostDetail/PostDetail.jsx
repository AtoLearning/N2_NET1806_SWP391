import { useState } from 'react'
import '../PostDetail/PostDetailStyle.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {FaTimes} from "react-icons/fa";
import axios from "axios";
const baseUrl = "http://localhost:8080/api/v1/manager/posts/moderate"

const initialState = {
    reason: '',
    status: '',
}

export default function PostDetail() {
    const [show, setShow] = useState(false);
    const [state, setState] = useState(initialState);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleShow = (status) => {
        if (status === 'Approved') {
            setState({ ...state, reason: '', status });
            moderatePost({ ...state, status }, post.postId);
        } else {
            setState({ ...state, status });
            setShow(true);
            setError('');
        }
    };

    const handleChange = (event) => {
        setState({ ...state, reason: event.target.value });
    };

    const handleBack = () => {
        setShow(false);
        setState({ ...state, reason: '', status: '' });
        setError('');
    };

    const handleSendClick = () => {
        if (state.reason.trim() === '' && state.status === 'Rejected') {
            setError('Please provide a reason for refusal.');
        } else {
            setError('');
            setShow(false);
            moderatePost(state, post.postId);
        }
    };

    const location = useLocation();
    const { post } = location.state || {};

    const moderatePost = async (data, postId) => {
        if(data.status === 'Approved') {
            data.reason = '';
        }
        try {
            const response = await axios.put(`${baseUrl}/${postId}`, data, {withCredentials: true, responseType: "json"});
            if (response.status === 200) {
                navigate('/m/moderate/posts');
            }
        }catch(error) {
            if(error.response) {
                console.log(error);
            }
        }
    }
    const validateForm = () => {
        // let isValid = true;
        // let errors = { ...error_init };
        //
        // if (cateName.trim().length < 5) {
        //     errors.cateName_err = 'Category name must be more than 4 words';
        //     isValid = false;
        // }
        //
        // if(!(available.trim().toLowerCase() === "true" || available.trim().toLowerCase() === "false")) {
        //     errors.available_err = 'TRUE or FALSE';
        //     isValid = false;
        // }
        //
        // setErrors(errors);
        // return isValid;
        return true;
    }

    if (!post) {
        return <div>No post data available.</div>;
    }

    const isPostActionable = post.postStatus !== 'Rejected' && post.postStatus !== 'Transacted';

    return (
        <div className='post-detail-contain'>
            <div className='post-detail-content'>
                <div className="post-header">
                    <h1>Post Information</h1>
                    <button className="post-close-button">
                        <Link to="/m/moderate/posts">
                            <FaTimes/>
                        </Link>
                    </button>
                </div>
                <div className='post-detail-body'>
                    <div className='box-detail-img-user'>
                        <div className='detail-img'>
                            <img
                                src={post.postImage}
                                alt="goods"
                            />
                        </div>
                        <div className='detail-date'>{post.createAt}</div>
                        <div className='detail-user'>
                            <img
                                src={post.customerViewDto.avatar}
                                alt="avatar"
                            />
                            <p>
                                <span>{post.customerViewDto.cuserName}</span>
                                <span>{post.customerViewDto.givenName}</span>
                                <span>{post.customerViewDto.rank} - {post.customerViewDto.points} pts</span>
                            </p>
                        </div>
                    </div>
                    <div className='box-detail-post-info'>
                        <div className='box-detail-title'>
                            <label>Title:</label>
                            <div>{post.title}</div>
                        </div>
                        <div className='box-detail-description'>
                            <label>Description:</label>
                            <div>{post.content}</div>
                        </div>
                        <div className='box-detail-1'>
                            <label>Street Number:</label>
                            <div>{post.streetNumber}</div>
                        </div>
                        <div className='box-detail-2'>
                            <div>
                                <label>Street:</label>
                                <div>{post.street}</div>
                            </div>
                            <div>
                                <label>Ward:</label>
                                <div>{post.wardName}</div>
                            </div>
                        </div>
                        <div className='box-detail-2'>
                            <div>
                                <label>District:</label>
                                <div>{post.districtName}</div>
                            </div>
                            <div>
                                <label>City:</label>
                                <div>{post.cityName}</div>
                            </div>
                        </div>
                        {post.postStatus === 'Rejected' && (
                            <div className='box-detail-2'>
                                <div>
                                    <label>Reason for rejection:</label>
                                    <div>{post.reason}</div>
                                </div>
                            </div>
                        )
                        }
                        {show && isPostActionable && (post.postStatus === 'Approved' || post.postStatus === 'Approving') &&
                            (
                                <form className='box-detail-reason'>
                                    <label>Reason for refuse:</label>
                                    <textarea
                                        id="reason"
                                        value={state.reason}
                                        onChange={handleChange}
                                        placeholder="Provide a reason for refusal"
                                    />
                                    {error && <p className="error-message">{error}</p>}
                                </form>
                            )
                        }
                    </div>
                </div>
                {isPostActionable && !show ?
                    (<div className='post-detail-button'>
                        <div className='btn-back'>
                            <button onClick={handleBack}>Back</button>
                        </div>
                        <div className='box-detail-btn'>
                            <button className='btn-refuse' onClick={() => handleShow('Rejected')}>Reject</button>
                            {post.postStatus !== 'Approved' && (
                                <button className='btn-accept' onClick={() => handleShow('Approved')}>Approve</button>
                            )}
                        </div>
                    </div>)
                    : isPostActionable && (
                        <div className='post-detail-button'>
                            <div className='btn-back'>
                                <button onClick={handleBack}>Back</button>
                            </div>
                            <div className='box-detail-btn'>
                                <button className='btn-refuse' onClick={handleSendClick}>Submit</button>
                            </div>
                        </div>
                    )
                };
            </div>
        </div>
    )
}
PostDetail.propTypes = {
    post: PropTypes.shape({
        postImage: PropTypes.string,
        createAt: PropTypes.string,
        customerViewDto: PropTypes.shape({
            avatar: PropTypes.string,
            cuserName: PropTypes.string,
            givenName: PropTypes.string,
        }),
        title: PropTypes.string,
        postContent: PropTypes.string,
        streetNumber: PropTypes.string,
        street: PropTypes.string,
        wardName: PropTypes.string,
        districtName: PropTypes.string,
        cityName: PropTypes.string,
    }).isRequired,
};
