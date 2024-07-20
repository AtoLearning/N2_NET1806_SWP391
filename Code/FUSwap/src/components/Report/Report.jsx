import React from 'react'
import '../../components/Report/ReportStyle.css'

export default function Report({ show, onClose, post }) {
    if (!show) return null;
    const handleBackClick = (event) => {
        event.preventDefault();
        onClose();
    };
    return (
        <div className='report-overlay'>
            <div className='report-contain'>
                <div className='report-content'>
                    <h2>Report</h2>
                    <div className='post-info-rp'>
                        <img
                            src={post.PostImage}
                            alt="Product"
                        />
                        <p>{post.Title}</p>
                    </div>
                    <form className='post-report'>
                        <div className='sub-content sub-1'>
                            <label>Title:</label>
                            <input 
                            type='text' 
                            name='reportTitle'
                            // value={''}
                            />
                        </div>
                        <div className='sub-content sub-2'>
                            <label>Description:</label>
                            <textarea placeholder='Write down what you want to report...' />
                        </div>
                        <div className='sub-3'>
                            <label>Image:</label>
                            <input 
                            type='file' 
                            name='reportImage' 
                            // value={''} 
                            />
                        </div>
                        <div className='report-buttons'>
                            <button className='rp-back-btn' onClick={handleBackClick}>Back</button>
                            <button className='rp-submit-btn' onClick={(e) => e.preventDefault()}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
