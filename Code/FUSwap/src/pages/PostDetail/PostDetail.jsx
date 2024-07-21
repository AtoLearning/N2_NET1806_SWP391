import React, { useState } from 'react'
import '../PostDetail/PostDetailStyle.css'

export default function () {
    const [show, setShow] = useState(false);
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const handleShow = () => {
        setShow(true);
        setError('');
    }
    const handelChange = (event) => {
        setReason(event.target.value);
    }
    const handleBack = () => {
        setShow(false);
        setReason('');
        setError('');
    }
    const handleSendClick = () => {
        if (reason.trim === '') {
            setError('Please provide a reason for refusal.');
        } else {
            console.log('Reason for refusal:', reason);
            setError('');
            setShow(false);
            setReason('');
        }
    }
    const post = {
        title: 'Máy tính laptop hàng chính hãng (DELL-HP) Ram 8GB Intel Core i5 - i7 ổ SSD 256GB màn 12.5", 14",15.6',
        content: 'Hải Nam Computer - Cam Kết Hàng Chính Hãng - Uy tín - Chất Lượng Máy tính laptop hàng chính hãng Ram 8GB Intel Core i5 - i7 ổ SSD 256GB - Bảo hành 12 tháng. LƯU Ý : - MÁY LÀ HÀNG ĐÃ QUA SỬ DỤNG, NGOẠI HÌNH TẦM 98% (LIKENEW) - PHỤ KIỆN CÓ: MÁ',
        postImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2Fgoods%2F71ehzrGUO7L.jpg?alt=media&token=be24d056-34fb-435e-9c45-dc21b7bb4508',
        date: '21-07-2024',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNam.jpg?alt=media&token=3d50445b-94f0-4631-ad57-a756e436ca0b',
        email: 'nnnaaasexxxxx1@fpt.edu.vn',
        fullName: 'Nguyen Nguyen Nguyen Nguyen Ng',
        streetNumber: '193D/21',
        street: 'Pham Van Bach',
        ward: 'Dương Minh Châu',
        district: 'Go Vap',
        city: 'Ho Chi Minh',
    };
    return (
        <div className='post-detail-contain'>
            <div className='post-detail-content'>
                <div className='post-detail-header'>
                    <h2>Post Information</h2>
                </div>
                <div className='post-detail-body'>
                    <div className='box-detail-img-user'>
                        <div className='detail-img'>
                            <img
                                src={post.postImage}
                                alt="goods"
                            />
                        </div>
                        <div className='detail-date'>{post.date}</div>
                        <div className='detail-user'>
                            <img
                                src={post.avatar}
                                alt="avatar"
                            />
                            <p>
                                <span>{post.email}</span>
                                <span>{post.fullName}</span>
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
                                <div>{post.ward}</div>
                            </div>
                        </div>
                        <div className='box-detail-2'>
                            <div>
                                <label>District:</label>
                                <div>{post.district}</div>
                            </div>
                            <div>
                                <label>City:</label>
                                <div>{post.city}</div>
                            </div>
                        </div>
                        {show === true ?
                            (
                                <form className='box-detail-reason'>
                                    <label>Reason for refuse:</label>
                                    <textarea
                                        id="reason"
                                        value={reason}
                                        onChange={handelChange}
                                        placeholder="Provide a reason for refusal"
                                    />
                                </form>
                            ) : ''
                        }
                    </div>
                </div>
                {show === false ?
                    (<div className='post-detail-button'>
                        <div className='btn-back'>
                            <button onClick={''}>Back</button>
                        </div>
                        <div className='box-detail-btn'>
                            <button className='btn-refuse' onClick={handleShow}>Refuse</button>
                            <button className='btn-accept' onClick={''}>Accept</button>
                        </div>
                    </div>)
                    :
                    (
                        <div className='post-detail-button'>
                            <div className='btn-back'>
                                <button onClick={handleBack}>Back</button>
                            </div>
                            <div className='box-detail-btn'>
                                <button className='btn-refuse' onClick={handleSendClick}>Send</button>
                            </div>
                        </div>
                    )
                };
            </div>
        </div>
    )
}
