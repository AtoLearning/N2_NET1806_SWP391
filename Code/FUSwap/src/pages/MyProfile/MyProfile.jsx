import React, { useEffect, useState } from 'react'
import '../MyProfile/MyProfileStyle.css'
import SideBar from '../../components/SideBar/SideBar'
import axios from 'axios'
import moment from 'moment'
import {storage} from "../../firebaseConfig.js";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import {FaLeaf, FaSeedling, FaTree} from "react-icons/fa";

const baseUrl = "http://localhost:8080/api/v1/customer/permission/profile"
const updateUrl = "http://localhost:8080/api/v1/customer/permission/profile/update"

const initialState = {
    givenName: '',
    nickname: '',
    avatar: '',
    phone: '',
    dob: '',
    gender: '',
}
const error_init = {
    givenName_err: '',
    fullName_err: '',
    phone_err: '',
    avatar_err: '',
    dob_err: '',
    gender_err: '',
}

export default function MyProfile() {

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
        console.log(data);
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

        if (!(3 <= state.nickname.trim().length && state.nickname.trim().length <= 10)) {
            errors.nickName_err = 'Nickname must be between 3 and 10 characters long';
            isValid = false;
        }

        if (!(5 <= state.givenName.trim().length && state.givenName.trim().length <= 30)) {
            errors.givenName_err = 'Full name must be between 5 and 30 characters long';
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

    let rankIcon;
    if (profile.rank === 'Gold') {
        rankIcon = <FaSeedling />;
    } else if (profile.rank === 'Silver') {
        rankIcon = <FaLeaf />;
    } else if (profile.rank === 'Diamond') {
        rankIcon = <FaTree />;
    }

    return (
        <div className='profile-contain'>
            <div className='profile-left'><SideBar /></div>
            <div className='profile-right'>
                <div className='box-profile'>
                    <div className='profile-head'>
                        <h1>My Profile</h1>
                        <p>Manage profile information to secure your account</p>
                    </div>
                    <div className='profile-content'>
                        <form
                            onSubmit={handleSubmit}
                            className='profile-info'
                        >
                            <div className='box-info'>
                                <label>Full Name:</label>
                                <input
                                    className='info-input'
                                    type='text'
                                    name='givenName'
                                    value={state.givenName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.givenName_err &&
                                <div className='box-info'>
                                        <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>
                                            {errors.givenName_err}
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

                            <div className='box-info important'>
                                <label>Email:</label>
                                <input
                                    className='info-input'
                                    type='email'
                                    name='cuserName'
                                    value={profile.cuserName}
                                    readOnly
                                />
                            </div>

                            <div className='box-info important'>
                                <label>Points:</label>
                                <input
                                    className='info-input'
                                    type='number'
                                    name='points'
                                    value={profile.points}
                                    readOnly
                                />
                            </div>

                            <div className='box-info important'>
                                <label>Rank:</label>
                                <span className='info-input'>
                                    {profile.rank} {rankIcon}
                                </span>
                            </div>

                            <div className='box-info'>
                                <label>Nickname:</label>
                                <input
                                    className='info-input'
                                    type='text'
                                    name='nickname'
                                    value={state.nickname}
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

                            {isEditing && (<div className='box-info box-submit'>
                                <button className='update-btn' type="submit">Submit</button>
                            </div>)}
                        </form>
                        <div className='profile-img'>
                            <div className='box-img'>
                                <img
                                    className='avatar-img'
                                    name='avatar'
                                    src={imageURL || profile.avatar}
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
