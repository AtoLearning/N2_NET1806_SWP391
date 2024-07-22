import React from 'react'
import './CustomerInfoStyle.css'

export default function CustomerInfo() {
    const customerInfo = {
        email: 'nnhSE172203@fpt.edu.vn',
        fullName: 'Nguyen Ngoc Hoa',
        nickname: 'Sara',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1',
        point: '20',
        phone: '038 xxxx xxx',
        birthday: '11-08-2003',
        gender: 'Female',
        role: 'Customer',
        userName: 'Mod1',
        password: '123456',
    };
    return (
        <div className='cus-info-contain'>
            <div className='cus-info-content'>
                <div className='cus-info-header'>
                    {customerInfo.role === 'Customer' ?
                        (<h2>Customer Information</h2>)
                        :
                        (<h2>Moderator Information</h2>)
                    }
                </div>
                <div className='cus-info-body'>
                    <div className='cus-info-left'>
                        <div className='cus-box-img'>
                            <img
                                src={customerInfo.avatar}
                                alt="avatar" />
                        </div>
                        <div className='cus-box-info'>
                            <label>Role:</label>
                            <p>{customerInfo.role}</p>
                        </div>
                        <div className='cus-box-info'>
                            <label>Point:</label>
                            <p>{customerInfo.point}</p>
                        </div>

                    </div>
                    <div className='cus-info-right'>
                        {customerInfo.role === 'Customer' ?
                            (
                                <div className='cus-info-style-1'>
                                    <label>Email:</label>
                                    <p>{customerInfo.email}</p>
                                </div>
                            )
                            :
                            (
                                <div className='cus-info-style'>
                                    <span>
                                        <label>Username:</label>
                                        <p>{customerInfo.userName}</p>
                                    </span>
                                    <span>
                                        <label>Password:</label>
                                        <p>{customerInfo.password}</p>
                                    </span>
                                </div>
                            )
                        }
                        <div className='cus-info-style'>
                            <span >
                                <label>Full Name:</label>
                                <p>{customerInfo.fullName}</p>
                            </span>
                            <span >
                                <label>Nickname:</label>
                                <p>{customerInfo.nickname}</p>
                            </span>
                        </div>
                        <div className='cus-info-style-2'>
                            <label>Phone:</label>
                            <p>{customerInfo.phone}</p>
                        </div>
                        <div className='cus-info-style-2'>
                            <label>Birthday:</label>
                            <p>{customerInfo.birthday}</p>
                        </div>
                        <div className='cus-info-style-2'>
                            <label>Gender:</label>
                            <p>{customerInfo.gender}</p>
                        </div>
                        <div className='cus-info-btn'>
                            <button className='back-btn' onClick={'back-btn'}>Back</button>
                            <button className='ban-btn' onClick={''}>Ban</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
