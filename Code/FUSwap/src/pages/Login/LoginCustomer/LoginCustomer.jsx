import React from 'react'
import { FaGooglePlus } from "react-icons/fa";
import './LoginCustomerStyle.css'

const baseURL = "http://localhost:8080/api/v1/auth/login";

const handleLogin = () => {
  window.location.href = baseURL;
};

export default function Login() {
  return (
    <div className='login'>
        <div className='login_left'>
          <div className='login_div_1'>
            <img
              className='login_div login_img_1'
              src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2Flogin_1.jpg?alt=media&token=d2569e7b-bf5b-4344-87f1-fe327de83439'
              alt='login_img_1'
            />
          </div>
          <div className='login_div login_div_2'>
            <img
              className='login_img_2'
              src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2Flogin_2.jpg?alt=media&token=c2bccb91-e777-44d7-bd55-34939f6df2c5'
              alt='login_img_1'
            />
          </div>
          <div className='login_div login_div_3'>
            <img
              className='login_img_3'
              src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2Flogin_3.jpg?alt=media&token=4222ff77-8638-41f8-82e5-319ec0d9a0a2'
              alt='login_img_1'
            />
          </div>
        </div>
        <div className='login_right'>
          <img
            className='login_img'
            src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2Flogin.jpeg?alt=media&token=4f1459b1-2bf9-430d-bc52-7f9579ced301'
            alt='login_img'
          />
          <button className='login_btn' onClick={handleLogin}>
            <FaGooglePlus className='icon'/>
            <div><p className='login_text'>Login email @fpt.edu.vn</p></div>
          </button>
          <div className='login_text'><p>Join with us</p></div>
        </div>
      </div>
      
  )
}
