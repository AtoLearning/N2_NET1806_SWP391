import React, {useEffect, useState} from 'react';
import './TheOrdersStyle.css';
import SideBar from '../../components/SideBar/SideBar';
import Feedback from '../../components/Feedback/Feedback';
import Report from '../../components/Report/Report';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import moment from "moment/moment.js";
import {FaPlus} from "react-icons/fa";

const MyTransUrl = "http://localhost:8080/api/v1/customer/permission/my-trans"
const baseUrl = "http://localhost:8080/api/v1/customer/permission/profile"

export default function TheOrders() {
    const [showFeedback, setShowFeedback] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [transType, setTransType] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const getAllTransactions = async (page, transType) => {
        setTransactions([]);
        try {
            const response = await axios.get(MyTransUrl, {
                params: {
                    pageNo: page,
                    transType: transType
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setTransactions(response.data.obj);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                navigate('/not_found');
            } else {
                console.log(error);
            }
        }
    };
    useEffect(() => {
        getAllTransactions(page, transType);
    }, [page, transType]);
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(baseUrl, {withCredentials: true });
                setProfile(response.data.obj);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfileData();
    }, []);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleOpenFeedback = (trans, event) => {
        event.stopPropagation();
        event.preventDefault();
        setSelectedPost(trans);
        setShowFeedback(true);
    }

    const handleCloseFeedback = () => {
        setShowFeedback(false);
    }

    const handleOpenReport = (trans, event) => {
        event.stopPropagation();
        event.preventDefault();
        setSelectedPost(trans);
        setShowReport(true);
    }

    const handleCloseReport = () => {
        setShowReport(false);
    }

    const handleCardClick = (trans) => {
        navigate('/c/my-transaction/details', { state: { transaction: trans } });
    }

    const handleClick = (transType, event) => {
        setTransType(transType);
    }

    return (
        <>
        <div className='orders-contain'>
            <div className='orders-left'>
                <SideBar/>
            </div>
            <div className='orders-right'>
                <div className='orders-head'>
                    <div className='box-btn'>
                        <button className='createPost-btn btn-1' onClick={(event) => handleClick('Consumption', event)}>
                            <span style={{fontSize: "16px"}}>Consumption</span>
                        </button>
                        <button className='createPost-btn btn-2' onClick={(event) => handleClick('Supply', event)}>
                            <span style={{fontSize: "16px"}}>Supply</span>
                        </button>
                    </div>
                    <div className='orders-head-right'>
                        <label>My Point:</label>
                        <p>{profile.points}</p>
                    <img
                        className='point-img'
                        src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FPoint.png?alt=media&token=3468b01e-b275-4d50-9c9b-b4f5a7dd950c'
                        alt='point'
                    />
                </div>
            </div>
            {transactions.length > 0 ? transactions.map((trans, index) => (
                <div key={index} className='orders-content'
                     onClick={() => handleCardClick(trans)}
                >
                    <div className='orders-card'>
                        <div className='box-post-img'>
                            <img
                                className='post-img'
                                src={trans.goodsPostViewDto.postImage}
                                        alt='postImage'
                                    />
                                </div>
                                <div className='box-post-content'>
                                    <p className='orders-post-title'>{trans.goodsPostViewDto.title}</p>
                                    <p className='orders-post-content'>{trans.goodsPostViewDto.content}</p>
                                    {trans.transType === "Consumption" ? (
                                        <>
                                            {trans.goodsPostViewDto.feedbackDto === null ? (
                                                <>
                                                    <button
                                                        className='feedback-btn'
                                                        onClick={(e) => handleOpenFeedback(trans, e)}
                                                    >
                                                        Feedback
                                                    </button>
                                                    {showFeedback && selectedPost?.transId === trans.transId && (
                                                        <Feedback
                                                            show={showFeedback}
                                                            onClose={handleCloseFeedback}
                                                            trans={trans}
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <div className='avatar-container'>
                                                        <img className='img-ava-consumer' src={trans.consumer.avatar}
                                                             alt='avatar'/>
                                                        <div className='text-container'>
                                                            <span>You</span>
                                                            <span>{trans.goodsPostViewDto.feedbackDto.content}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div className='avatar-container'>
                                                <img className='img-ava-consumer' src={trans.consumer.avatar}
                                                     alt='avatar'/>
                                                <div className='text-container'>
                                                    <span>{trans.consumer.nickname}</span>
                                                    {trans.goodsPostViewDto.feedbackDto == null ? (
                                                        <span style={{fontStyle: "italic"}}>Consumer does not feedback yet</span>
                                                    ) : (
                                                        <span>{trans.goodsPostViewDto.feedbackDto.content}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className='box-post-user'>
                                    <div className='box-img-ava'>
                                        <img
                                            className='img-ava'
                                            src={trans.supplier.avatar}
                                            alt='avatar'
                                        />
                                    </div>
                                    <p className='box-point'>Points: {trans.supplier.points}</p>
                                    <p className='nickname'>{trans.supplier.nickname}</p>
                                    {trans.transType === "Consumption" ? (
                                        <>
                                            <button
                                                className='orders-btn'
                                                onClick={(e) => handleOpenReport(trans, e)}
                                            >
                                                Report
                                            </button>
                                            {showReport && selectedPost?.transId === trans.transId && (
                                                <Report
                                                    show={showReport}
                                                    onClose={handleCloseReport}
                                                    post={selectedPost}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className='orders-btn'
                                                onClick={(e) => handleOpenReport(trans, e)}
                                            >
                                                View Report
                                            </button>
                                            {showReport && selectedPost?.transId === trans.transId && (
                                                <Report
                                                    show={showReport}
                                                    onClose={handleCloseReport}
                                                    post={selectedPost}
                                                />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <span>No transactions found</span>
                    )}
            </div>
        </div>
        <div style={{textAlign: 'center', marginTop: '20px'}}>
            <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                Previous
            </button>
            <span style={{margin: '0 10px'}}>{page} / {totalPages}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
                Next
            </button>
        </div>
        </>
    )
}
