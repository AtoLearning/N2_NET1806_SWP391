import React, { useState }  from 'react'
import './TheOrdersStyle.css'
import SideBar from '../../components/SideBar/SideBar'
import Feedback from '../../components/Feedback/Feedback';
import Report from '../../components/Report/Report';


export default function TheOrders() {
    const cardData = [
        { PostID: 1, Title: 'ABC1', Content: 'sdvgbhnjsd sbdhns', PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2', CustomerID: 1, Nickname: 'abc1', Avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1', Points: 10 },
        { PostID: 2, Title: 'ABC2', Content: 'sdvgbhnjsd sbdhns', PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2', CustomerID: 2, Nickname: 'abc2', Avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1', Points: 20 },
        { PostID: 3, Title: 'ABC3', Content: 'sdvgbhnjsd sbdhns', PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2', CustomerID: 3, Nickname: 'abc3', Avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1', Points: 20 },
        { PostID: 4, Title: 'ABC4', Content: 'sdvgbhnjsd sbdhns', PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2', CustomerID: 4, Nickname: 'abc4', Avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1', Points: 5 },
        { PostID: 5, Title: 'ABC5', Content: 'sdvgbhnjsd sbdhns', PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2', CustomerID: 5, Nickname: 'abc5', Avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1', Points: 8 },
        { PostID: 6, Title: 'ABC6', Content: 'sdvgbhnjsd sbdhns', PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2', CustomerID: 6, Nickname: 'abc6', Avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1', Points: 30 }
    ];

    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showReport, setShowReport] = useState(false);

    const handleOpenFeedback = (data) => {
        setSelectedPost(data);
        setShowFeedback(true);
    }

    const handleCloseFeedback = () => {
        setShowFeedback(false);
    }

    const handleOpenReport = (data) => {
        setSelectedPost(data);
        setShowReport(true);
    }

    const handleCloseReport = () => {
        setShowReport(false);
    }
    return (
        <div className='orders-contain'>
            <div className='orders-left'>
                <SideBar />
            </div>
            <div className='orders-right'>
                <div className='orders-head'>
                    <form className='orders-head-left'>

                        <input
                            className='input-post-id'
                            type='text'
                            // value={''}
                            name='postId'
                            required
                        />
                        <p>PostID</p>
                        <button className='box-symbol-img'>
                            <img
                                className='symbol-img'
                                src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FSymbol.png?alt=media&token=e4b817f4-8816-4106-8649-7c8560029868'
                                alt='symbol'
                            />
                        </button>
                    </form>
                    <div className='orders-head-right'>
                        <label>My Point:</label>
                        <p>{cardData.Points}</p>
                        <img
                            className='point-img'
                            src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FPoint.png?alt=media&token=3468b01e-b275-4d50-9c9b-b4f5a7dd950c'
                            alt='point'
                        />
                    </div>
                </div>
                <div className='orders-content'>
                    {cardData.map((data) => (
                        <div key={data.PostID} className='orders-card'>
                            <div className='box-post-img'>
                                <img
                                    className='post-img'
                                    src={data.PostImage}
                                    alt='postImage'
                                />
                            </div>
                            <div className='box-post-content'>
                                <p className='orders-post-title'>{data.Title}</p>
                                <p className='orders-post-content'>{data.Content}</p>
                                <button
                                    className='feedback-btn'
                                    onClick={() => handleOpenFeedback(data)}
                                >
                                    Feedback
                                </button>
                                {showFeedback && (
                                    <Feedback
                                        show={showFeedback}
                                        onClose={handleCloseFeedback}
                                        post={selectedPost}
                                    />
                                )}
                            </div>
                            <div className='box-post-user'>
                                <div className='box-img-ava'>
                                    <img
                                        className='img-ava'
                                        src={data.Avatar}
                                        alt='avatar'
                                    />
                                </div>
                                <p className='box-point'>Poin: {data.Points}</p>
                                <p className='nickname'>{data.Nickname}</p>
                                <button
                                    className='orders-btn'
                                    onClick={() => handleOpenReport(data)}
                                >
                                    Report
                                </button>
                                {showReport && (
                                    <Report
                                        show={showReport}
                                        onClose={handleCloseReport}
                                        post={selectedPost}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}
