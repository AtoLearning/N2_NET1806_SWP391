import React, { Fragment, useState } from 'react'
import Address from '../../components/Address/Address'
import './PostStyle.css'
import { FaTimes } from 'react-icons/fa';

export default function TradePost() {
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    // const [amount, setAmount] = useState('');
    const [formData, setFromData] = useState({
        title: '',
        description: '',
        price: null,
        img: null,
        category: '',
        streetNumber: '',
        street: '',
        ward: '',
        district: '',
        city: ''
    });
    const category = [
        { CateID: 1, CateName: 'abc 1' },
        { CateID: 2, CateName: 'abc 2' },
        { CateID: 3, CateName: 'abc 3' },
        { CateID: 4, CateName: 'abc 4' },
        { CateID: 5, CateName: 'abc 5' },
    ];
    // const formatCurrency = (event) => {
    //     const input = event.target.value.replace(/\D/g, '');
    //     setAmount(input);
    //     if (input) {
    //         setFormattedAmount(Number(input).toLocaleString('vi-VN'));
    //     } else {
    //         setFormattedAmount('');
    //     }
    // };

    return (
        <div className='post-contain'>
            <div className='post'>
                <div className="post-header">
                    <h1>Sell</h1>
                    <button className="post-close-button"><FaTimes /></button>
                </div>
                <div className="post-content">
                    <form method='post' className="post-form">
                        <div className="form-group form-input">
                            <p>Title:</p>
                            <input
                                className='input-text input-1'
                                type='text'
                                name='title'
                                // value={formData.title}
                                required
                            />
                        </div>
                        <div className="form-group form-textarea">
                            <p>Description:</p>
                            <div className='box-textarea'>
                                <textarea
                                    className='input-text input-2'
                                    name='description'
                                    // value={formData.description}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-price form-group">
                            <p>Price:</p>
                            <input
                                className='input-text input-1'
                                type='text'
                                name='price'
                                // id="amount"
                                // value={amount}
                                // onChange={formatCurrency}
                                // value={formData.price}
                                required
                            />
                        </div>
                        <div className="form-group image-category-address-group">
                            <div className="image-upload">
                                <p>Image:</p>
                                <input
                                    type='file'
                                    name='image'
                                    required
                                />
                            </div>
                            <div className="category-address">
                                <div className='box-select'>
                                    <select className="form-control select">
                                        <option value="">Select Category</option>
                                        {category.map((category) => (
                                            <option key={category.CateID} value={category.CateID}>{category.CateName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='box-address'>
                                    <Address
                                        onCityChange={setCity}
                                        onDistrictChange={setDistrict}
                                        onWardChange={setWard}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group form-input">
                            <p>Street Number:</p>
                            <input
                                className='input-text input-1'
                                type='text'
                                name='streetNumber'
                                // value={formData.streetNumber}
                                required
                            />
                        </div>
                        <div className="form-group form-input">
                            <p>Street:</p>
                            <input
                                className='input-text input-2'
                                type='text'
                                name='street'
                                // value={formData.street}
                                required
                            />
                        </div>
                        <div className='box-button'>
                            <button className="post-button">Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
