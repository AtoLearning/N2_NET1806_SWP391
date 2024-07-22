import React, {useCallback, useEffect, useState} from 'react'
import Address from '../../components/Address/Address'
import './PostStyle.css'
import { FaTimes } from 'react-icons/fa';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {storage} from "../../firebaseConfig.js";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";

const initialState = {
    title: '',
    postContent: '',
    isExchange: true,
    unitPrice: 0,
    postImage: '',
    streetNumber: '',
    street: '',
    wardDto: {
        wardId: 0,
        wardName: ''
    },
    districtDto: {
        districtId: 0,
        districtName: ''
    },
    cityDto: {
        cityId: 0,
        cityName: ''
    },
    categoryDto: {
        cateId: 0,
        cateName: ''
    }
}
const error_init = {
    title_err: '',
    postContent_err: '',
    streetNumber_err: '',
    street_err: '',
}

const cateUrl = "http://localhost:8080/api/v1/guest/categories";
const addUrl = "http://localhost:8080/api/v1/customer/permission/my-post/create";

export default function TradePost() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(error_init);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const updateImage = () => {
        return new Promise((resolve, reject) => {
            if (image == null) {
                resolve('');
                return;
            }
            const imageRef = ref(storage, `images/${image.name + v4()}`);
            uploadBytes(imageRef, image)
                .then(snapshot => getDownloadURL(snapshot.ref))
                .then(url => {
                    console.log("Image URL:", url);
                    resolve(url);
                })
                .catch(error => {
                    console.error("Error uploading image:", error);
                    reject(error);
                });
        });
    };
    const getAllCategories = async () => {
        try {
            const response = await axios.get(cateUrl, {withCredentials: true});
            if (response.status === 200) {
                setCategories(response.data.obj);
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllCategories();
    }, []);

    const addNewPost = async (data) => {
        try {
            const response = await axios.post(addUrl, data, {withCredentials: true, responseType: "json"});
            console.log(response);
            if (response.status === 201) {
                toast.success(response.data.message);
                navigate('/c/my-posts');
            }
        } catch(error) {
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

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setImageURL(URL.createObjectURL(file));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            updateImage().then(url => {
                const newState = { ...state, postImage: url };
                console.log(newState);
                addNewPost(newState);
            }).catch(error => {
                console.log(error);
            });
        }
        // else {
        //     toast.error("Some info is invalid ~ Pls check again");
        // }
    }

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setState((state) => ({ ...state, [name]: value }));
    }

    const handleInputSelectChange = (event) => {
        const { value } = event.target;
        const selectedCategory = categories.find(category => category.cateId === parseInt(value));
        setState((prevState) => ({
            ...prevState,
            categoryDto: {
                cateId: selectedCategory.cateId,
                cateName: selectedCategory.cateName
            }
        }));
    };

    const handleCityChange = useCallback((cityId, cityName) => {
        setState((prevState) => ({
            ...prevState,
            cityDto: {
                cityId,
                cityName
            }
        }));
    }, []);

    const handleDistrictChange = useCallback((districtId, districtName) => {
        setState((prevState) => ({
            ...prevState,
            districtDto: {
                districtId,
                districtName
            }
        }));
    }, []);

    const handleWardChange = useCallback((wardId, wardName) => {
        setState((prevState) => ({
            ...prevState,
            wardDto: {
                wardId,
                wardName
            }
        }));
    }, []);

    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (!(10 <= state.title.trim().length && state.title.trim().length <= 100)) {
            errors.title_err = 'Title must be between 10 and 100 characters long';
            isValid = false;
        }

        if (!(30 <= state.postContent.trim().length && state.postContent.trim().length <= 200)) {
            errors.postContent_err = 'Description must be between 30 and 200 characters long';
            isValid = false;
        }

        if (!(1 <= state.streetNumber.trim().length && state.streetNumber.trim().length <= 50)) {
            errors.streetNumber_err = 'Street number must be between 1 and 50 characters long';
            isValid = false;
        }

        if (!(10 <= state.street.trim().length && state.street.trim().length <= 150)) {
            errors.street_err = 'Street must be between 10 and 150 characters long';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    return (
        <div className='post-contain'>
            <div className='post'>
                <div className="post-header">
                    <h1>New Goods Post</h1>
                    <button className="post-close-button">
                        <Link to="/c/my-posts">
                            <FaTimes/>
                        </Link>
                    </button>
                </div>
                <div className="post-content">
                    <form onSubmit={handleSubmit} className="post-form">
                        <div className="form-group form-input">
                            <p>Title:</p>
                            <input
                                className='input-text input-1'
                                type='text'
                                name='title'
                                value={state.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {errors.title_err &&
                            <div className='form-group'>
                                        <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>
                                            {errors.title_err}
                                        </span>
                            </div>
                        }
                        <div className="form-group form-textarea">
                            <p>Description:</p>
                            <div className='box-textarea'>
                                <textarea
                                    className='input-text input-2'
                                    name='postContent'
                                    value={state.postContent}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            {errors.postContent_err &&
                                <div className='form-group'>
                                        <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>
                                            {errors.postContent_err}
                                        </span>
                                </div>
                            }
                        </div>
                        <div className="form-group image-category-address-group">
                            <div className="image-upload">
                                <div className="input-img">
                                    <p>Image:</p>
                                    <div>
                                        <input
                                            type='file'
                                            name='postImage'
                                            onChange={handleImageChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="box-input-img"><img src={imageURL} alt="Preview"/></div>
                            </div>
                            <div className="category-address">
                            <div className='box-select'>
                                <select className="form-control select" onChange={handleInputSelectChange} required>
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category.cateId} value={category.cateId}>{category.cateName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='box-address'>
                                    <Address
                                        onCityChange={handleCityChange}
                                        onDistrictChange={handleDistrictChange}
                                        onWardChange={handleWardChange}
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
                                value={state.streetNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {errors.streetNumber_err &&
                            <div className='form-group'>
                                        <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>
                                            {errors.streetNumber_err}
                                        </span>
                            </div>
                        }
                        <div className="form-group form-input">
                            <p>Street:</p>
                            <input
                                className='input-text input-2'
                                type='text'
                                name='street'
                                value={state.street}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {errors.street_err &&
                            <div className='form-group'>
                                        <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>
                                            {errors.street_err}
                                        </span>
                            </div>
                        }
                        <div className='box-button'>
                            <button className="post-button" type="submit">Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
