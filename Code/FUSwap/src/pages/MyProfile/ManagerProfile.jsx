import React, { useEffect, useState } from 'react'
import '../MyProfile/MyProfileStyle.css'
import axios from 'axios';

const baseUrl = "http://localhost:8080/api/v1/manager/profile"
const updateUrl = "http://localhost:8080/api/v1/manager/profile/update"

const initialState = {
    givenName: '',
    nickname: '',
    avatar: '',
    phone: '',
    dob: '',
    gender: '',
}

export default function ManagerProfile() {
    //--------------------------------------------------------------------------------

    const [profile, setProfile] = useState({
        userName: '',
        nickname: '',
        fullName: '',
        img: '',
        phone: '',
        birthday: '',
        gender: '',
        role: ''
    });
    //--------------------------------------------------------------------------------

    const [originalData, setOriginalData] = useState({});// lưu trữ dữ liệu ban đầu
    //thay isFormModified --> isEditing
    // const [isEditing, setIsEditing] = useState(false); // dùng để đánh dấu xem coi người dùng có đang sửa dữ liệu không để hiển thị nút submit (có api)
    const [isFormModified, setIsFormModified] = useState(false);// dùng để đánh dấu xem coi người dùng có đang sửa dữ liệu không để hiển thị nút submit

    //--------------------------------------------------------------------------------
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Thay thế URL này bằng URL API thực tế của bạn
                const response = await axios.get('http://your-backend-url/api/profile');
                setProfile(response.data);
                setOriginalData(response.data);

            } catch (error) {
                console.error('Error fetching profile data:', error);
                //có thể bỏ đi phần fake dữ liệu bên dưới
                //--------------------------------------------------------------------------------
                // Sử dụng dữ liệu giả nếu không có API
                const fakeData = {
                    userName: 'admin',
                    nickname: 'John Doe',
                    fullName: '123456',
                    img: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1',
                    phone: '123-456-7890',
                    birthday: '1990-01-01',
                    gender: 'Male',
                    role: 'Admin'
                };

                setProfile(fakeData);
                setOriginalData(fakeData);
                //--------------------------------------------------------------------------------
            }
        };

        fetchProfileData();
    }, []);
    //--------------------------------------------------------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
        //thay setIsFormModified --> setIsEditing
        // setIsEditing(true);
        setIsFormModified(true);
    };

    //--------------------------------------------------------------------------------
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       await axios.put('', profile);
    //       alert('Profile updated successfully!');
    //       setOriginalData(profile);
    //       setIsEditing(false);
    //     } catch (error) {
    //       console.error('Error updating profile data:', error);
    //       alert('Error updating profile data');
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi dữ liệu cập nhật lên backend
        console.log('Form data submitted:', profile);
    };
    //--------------------------------------------------------------------------------

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
                            method='post'
                            className='profile-info'
                            onSubmit={handleSubmit}
                        >
                            <div className='box-info important'>
                                <label>Username:</label>
                                <input
                                    className='info-input'
                                    type='text'
                                    name='userName'
                                    value={profile.userName}
                                    readOnly
                                />
                            </div>
                            <div className='box-info'>
                                <label>Full Name:</label>
                                <input
                                    className='info-input'
                                    type='text'
                                    name='fullName'
                                    value={profile.fullName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='box-info'>
                                <label>Nickname:</label>
                                <input
                                    className='info-input'
                                    type='text'
                                    name='nickName'
                                    value={profile.nickname}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='box-info'>
                                <label>Gender:</label>
                                <div className='info-input info-radio'>
                                    <p>
                                        <input
                                            type='radio'
                                            name='gender'
                                            value="Male"
                                            checked={profile.gender === 'Male'}
                                            onChange={handleChange}
                                        />
                                        Male
                                    </p>
                                    <p>
                                        <input
                                            type='radio'
                                            name='gender'
                                            value="Female"
                                            checked={profile.gender === 'Female'}
                                            onChange={handleChange}
                                        />
                                        Female
                                    </p>
                                    <p>
                                        <input
                                            type='radio'
                                            name='gender'
                                            value="Other"
                                            checked={profile.gender === 'Other'}
                                            onChange={handleChange}
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
                                    name='birthday'
                                    value={profile.birthday}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='box-info'>
                                <label>Phone:</label>
                                <input
                                    className='info-input'
                                    type='phone'
                                    name='phone'
                                    value={profile.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='box-info important'>
                                <label>Role:</label>
                                <input
                                    className='info-input'
                                    type='text'
                                    name='role'
                                    value={profile.role}
                                    readOnly
                                />
                            </div>
                            
                            {/* {isEditing && (<div className='box-info box-submit'><button className='update-btn' type="submit">Submit</button></div>)} */}
                            {isFormModified && (<div className='box-info box-submit'><button className='update-btn' type="submit">Save</button></div>)}
                        </form>
                        <div className='profile-img'>
                            <div className='box-img'>
                                <img
                                    className='avatar-img'
                                    src={profile.img}
                                    alt='avatar'
                                />
                            </div>
                            <div className='box-button'>
                                <button className='avatar-button'>
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
