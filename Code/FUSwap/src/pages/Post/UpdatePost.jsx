import { useCallback, useEffect, useState } from 'react';
import Address from '../../components/Address/Address';
import './UpdatePostStyle.css';
import { FaTimes, FaEdit } from 'react-icons/fa';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { storage } from "../../firebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const initialState = {
    title: 'Sample Title',
    postContent: 'Sample content for the post',
    isExchange: false,
    unitPrice: 100,
    postImage: 'sampleImage.jpg',
    streetNumber: '123',
    street: 'Sample Street',
    wardDto: {
        wardId: 1,
        wardName: 'Sample Ward'
    },
    districtDto: {
        districtId: 1,
        districtName: 'Sample District'
    },
    cityDto: {
        cityId: 1,
        cityName: 'Sample City'
    },
    categoryDto: {
        cateId: 1,
        cateName: 'Sample Category'
    }
}

const cateUrl = "http://localhost:8080/api/v1/guest/categories";
const addUrl = "http://localhost:8080/api/v1/customer/permission/my-post/create";

export default function TradePost() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [state, setState] = useState(initialState);
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
            const response = await axios.get(cateUrl, { withCredentials: true });
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
            const response = await axios.post(addUrl, data, { withCredentials: true, responseType: "json" });
            console.log(response);
            if (response.status === 201) {
                toast.success(response.data.message);
                navigate('/my-posts');
            }
        } catch (error) {
            if (error.response) {
                console.log(error);
                if (error.response.data.status === '400.1') {
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
        return true;
    }

    return (
        <div className='post-contain'>
            <div className='post'>
                <div className="post-header">
                    {state.isExchange ? (
                        <h1>Trade</h1>
                    ) : (
                        <h1>Sell</h1>
                    )
                    }

                    <button className="post-close-button">
                        <Link to="/my-post">
                            <FaTimes />
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
                        </div>

                        {state.isExchange ? (
                            <></>
                        ) : (
                            <>
                                <div className="form-price form-group">
                                    <p>Price:</p>
                                    <input
                                        className='input-text input-1'
                                        type='number'
                                        name='unitPrice'
                                        value={state.unitPrice}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </>
                        )
                        }


                        <div className="form-group image-category-address-group">
                            <div className="image-upload">
                                <div className="input-img">
                                    <p>Image:</p>
                                    <div>
                                        <input
                                            type='file'
                                            name='postImage'
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                                <div className="box-input-img"><img src={imageURL} alt="Preview" /></div>
                            </div>
                            <div className="category-address">
                                <div className='box-select'>
                                    <select className="form-control select" onChange={handleInputSelectChange}>
                                        <option value={state.categoryDto.cateId}>{state.categoryDto.cateName}</option>
                                        {categories.map((category) => (
                                            <option key={category.cateId}
                                                value={category.cateId}>{category.cateName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='box-address'>
                                    <Address
                                        onCityChange={handleCityChange}
                                        onDistrictChange={handleDistrictChange}
                                        onWardChange={handleWardChange}
                                        cityId={state.cityDto.cityId}
                                        cityName={state.cityDto.cityName}
                                        districtId={state.districtDto.districtId}
                                        districtName={state.districtDto.districtName}
                                        wardId={state.wardDto.wardId}
                                        wardName={state.wardDto.wardName}
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
                        <div className='box-button'>
                            <button className="post-button" type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    )
}
