import React, { useEffect, useState } from 'react'
import '../MyProfile/MyProfileStyle.css'
import axios from 'axios';
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebaseConfig.js";
import {v4} from "uuid";
import moment from 'moment'

const baseUrl = "http://localhost:8080/api/v1/manager/profile"
const updateUrl = "http://localhost:8080/api/v1/manager/profile/update"

const initialState = {
    nickName: '',
    fullName: '',
    phone: '',
    avatar: '',
    dob: '',
    gender: '',
}
const error_init = {
    nickName_err: '',
    fullName_err: '',
    phone_err: '',
    avatar_err: '',
    dob_err: '',
    gender_err: '',
}

export default function ManagerProfile() {
    const [profile, setProfile] = useState(initialState);
    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(error_init);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const updateImage = () => {
        return new Promise((resolve, reject) => {
            if (image == null) {
                resolve(state.avatar);
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
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(baseUrl, {withCredentials: true });
                const profileData = response.data.obj;
                profileData.dob = moment(profileData.dob).format('YYYY-MM-DD');
                setProfile(profileData);
                setState(profileData);
                console.log(profileData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfileData();
    }, []);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setImageURL(URL.createObjectURL(file));
    };
    const updatePersonalInformation = async (data) => {
        try {
            const response = await axios.put(updateUrl, data, {withCredentials: true, responseType: "json"});
            if (response.status === 200) {
                window.location.reload();
            }
        }catch(error) {
            if(error.response) {
                console.log(error);
            }
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            updateImage().then(url => {
                const newState = { ...state, avatar: url };
                updatePersonalInformation(newState);
            }).catch(error => {
                console.log(error);
            });
        }
    }
    const triggerFileInput = () => {
        document.getElementById('avatarInput').click();
        setIsEditing(true);
    }
    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setState((state) => ({ ...state, [name]: value }));
        setProfile((profile) => ({ ...profile, [name]: value }));
        setIsEditing(true);
    }
    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (!(3 <= state.nickName.trim().length && state.nickName.trim().length <= 10)) {
            errors.nickName_err = 'Nickname must be between 3 and 10 characters long';
            isValid = false;
        }

        if (!(5 <= state.fullName.trim().length && state.fullName.trim().length <= 30)) {
            errors.fullName_err = 'Full name must be between 5 and 30 characters long';
            isValid = false;
        }

        if (!(state.phone.trim().length === 10)) {
            errors.phone_err = 'Phone is not valid';
            isValid = false;
        }

        const currentDate = new Date();
        const selectedDate = new Date(state.dob);

        if (selectedDate > currentDate) {
            errors.dob_err = 'Date of birth cannot be in the future';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    return (
        <div className='m-profile-contain'>
            <div className='profile-right'>
                <div className='box-profile'>
                    <div className='profile-head'>
                        <h1>My Profile</h1>
                        <p>Manage profile information to secure your account</p>
                    </div>
                    <div className='profile-content'>
                        <form
                            className='profile-info'
                            onSubmit={handleSubmit}
                        >
                            <div className='box-info important'>
                                <label>Username:</label>
                                <input
                                    className='info-input'
                                    type='text'
                                    name='muserName'
                                    value={profile.muserName}
                                    readOnly
                                />
                            </div>
                            <div className='box-info'>
                                <label>Full Name:</label>
                                <input
                                    className='info-input'
                                    type='text'
                                    name='fullName'
                                    value={state.fullName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.fullName_err &&
                                <div className='box-info'>
                                        <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>
                                            {errors.fullName_err}
                                        </span>
                                </div>
                            }

                            <div className='box-info'>
                                <label>Nickname:</label>
                                <input
                                    className='info-input'
                                    type='text'
                                    name='nickName'
                                    value={state.nickName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.nickName_err &&
                                <div className='box-info'>
                                        <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>
                                            {errors.nickName_err}
                                        </span>
                                </div>
                            }

                            <div className='box-info'>
                                <label>Gender:</label>
                                <div className='info-input info-radio'>
                                    <p>
                                        <input
                                            type='radio'
                                            name='gender'
                                            value="Male"
                                            checked={state.gender === 'Male'}
                                            onChange={handleInputChange}
                                        />
                                        Male
                                    </p>
                                    <p>
                                        <input
                                            type='radio'
                                            name='gender'
                                            value="Female"
                                            checked={state.gender === 'Female'}
                                            onChange={handleInputChange}
                                        />
                                        Female
                                    </p>
                                    <p>
                                        <input
                                            type='radio'
                                            name='gender'
                                            value="Other"
                                            checked={state.gender === 'Other'}
                                            onChange={handleInputChange}
                                        />
                                        Other
                                    </p>
                                </div>
                            </div>

                            <div className='box-info'>
                                <label>Birthday:</label>
                                <input
                                    className='info-input'
                                    type='date'
                                    name='dob'
                                    value={state.dob}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.dob_err &&
                                <div className='box-info'>
                                        <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>
                                            {errors.dob_err}
                                        </span>
                                </div>
                            }

                            <div className='box-info'>
                                <label>Phone:</label>
                                <input
                                    className='info-input'
                                    type='phone'
                                    name='phone'
                                    value={state.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.phone_err &&
                                <div className='box-info'>
                                        <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>
                                            {errors.phone_err}
                                        </span>
                                </div>
                            }

                            {isEditing && (<div className='box-info box-submit'>
                                <button className='update-btn' type="submit">Submit</button>
                            </div>)}

                        </form>
                        <div className='profile-img'>
                            <div className='box-img'>
                                <img
                                    className='avatar-img'
                                    name='avatar'
                                    src={imageURL || state.avatar}
                                    alt='avatar'
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className='box-button'>
                                <input
                                    type='file'
                                    id='avatarInput'
                                    className='avatar-input'
                                    style={{display: 'none'}}
                                    onChange={handleImageChange}
                                />
                                <button className='avatar-button' onClick={triggerFileInput}>
                                    Change picture
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
