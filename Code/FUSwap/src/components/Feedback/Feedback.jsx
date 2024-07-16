// ReviewModal.jsx
import React from 'react';
import './FeedbackStyle.css';

const Feedback = ({ show, onClose, post }) => {
    if (!show) return null;
    // const product = {
    //     title: 'Văn bản là một loại hình phương tiện để ghi nhận, lưu giữ và truyền đạt các thông tin từ chủ thể này',
    //     image: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2Fgoods%2F71ehzrGUO7L.jpg?alt=media&token=be24d056-34fb-435e-9c45-dc21b7bb4508',
    // }
    return (
        <div className="fb-overlay">
            <div className='fb-contain' onClick={(e) => e.stopPropagation()}>
                <div className="fb-content" >
                    <h2>Feedback</h2>
                    <div className="post-info-fb">
                        <img
                            src={post.PostImage}
                            alt="Product"
                        />
                        <p>{post.Title}</p>
                    </div>
                    <form className='post-feedback'>
                        <textarea className='fb-textarea' placeholder="Please share what you like about this product..."></textarea>
                        <div className="modal-buttons">
                            <button className='back-btn' onClick={onClose}>Back</button>
                            <button className='complete-btn'>Complete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
