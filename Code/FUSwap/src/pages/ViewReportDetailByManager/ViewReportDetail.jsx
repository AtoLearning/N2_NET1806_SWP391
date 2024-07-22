import React, { useState } from 'react'
import './ViewReportStyle.css'

export default function ViewReportDetail() {
    const [show, setShow] = useState(false);
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const handleShow = () => {
        setShow(true);
        setError('');
    };
    const handelChange = (event) => {
        setReason(event.target.value);
    };
    const handleBack = () => {
        setShow(false);
        setReason('');
        setError('');
    };
    const handleSendClick = () => {
        if (reason.trim === '') {
            setError('Please provide a reason for refusal.');
        } else {
            console.log('Reason for refusal:', reason);
            setError('');
            setShow(false);
            setReason('');
        }
    };
    const data = {
        reAvatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNam.jpg?alt=media&token=3d50445b-94f0-4631-ad57-a756e436ca0b',
        supAvatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1',
        reEmail: 'ntase173839@fpt.edu.vn',
        supEmail: 'ntass173942@fpt.edu.vn',
        reFullName: 'Nguyen Tran Abc1',
        supFullName: 'Nguyen Thi Abc2',
        reportImg: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FBookStationery.jpg?alt=media&token=7cbb4a44-0e1e-440c-bac4-58adea612c96',
        title: 'Báo cáo về laptop không đúng mô tả: cấu hình, tình trạng sản phẩm và phụ kiện không chính xác',
        description: 'Sản phẩm laptop nhận được không đúng mô tả: cấu hình khác (Core i5, RAM 4GB, HDD 500GB), có dấu hiệu đã qua sử dụng với nhiều vết trầy xước, và thiếu phụ kiện như túi đựng và chuột không dây. Mong được hỗ trợ đổi hoặc hoàn trả.',
    };
    return (
        <div className='report-detail-contain'>
            <div className='report-detail-content'>
                <div className='report-detail-header'>
                    <h2>Report</h2>
                </div>
                <div className='report-detail-info'>
                    <div className='user-info'>
                        <label className='label-1'>Reporter</label>
                        <div>
                            <img
                                src={data.reAvatar}
                                alt="avatar"
                            />
                            <p>
                                <span className='report-email'>{data.reEmail}</span>
                                <span>{data.reFullName}</span>
                            </p>
                        </div>
                    </div>
                    <div className='user-info'>
                        <label className='label-2'>Supplier</label>
                        <div>
                            <img
                                src={data.supAvatar}
                                alt="avatar"
                            />
                            <p>
                                <span className='report-email'>{data.supEmail}</span>
                                <span>{data.supFullName}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='report-detail-body'>
                    <img
                        src={data.reportImg}
                        alt="report-img"
                    />
                    <div className='box-body'>
                        <div>
                            <label>Title:</label>
                            <p>{data.title}</p>
                        </div>
                        <div>
                            <label>Description</label>
                            <p>{data.description}</p>
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
                    (<div className='report-detail-button'>
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
                        <div className='report-detail-button'>
                            <div className='btn-back'>
                                <button onClick={handleBack}>Back</button>
                            </div>
                            <div className='box-detail-btn'>
                                <button className='btn-refuse' onClick={handleSendClick}>Send</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
