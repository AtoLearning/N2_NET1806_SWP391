import React from 'react'
import '../Login/LoginStyle.css'

export default function Login() {
  return (
    <div className='login'>
      <div className='loginContainer'>
        <div className='loginLeft'>
          <img
            className='loginImg1'
            src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2Fmanager_login_1.jpg?alt=media&token=7cdd5081-8b8f-4bac-9fbb-6a544921c653'
            alt='img_1'
          />
          <img
            className='loginImg2'
            src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2Fmanager_login_2.webp?alt=media&token=686260f4-970d-4bae-bf47-0b3bda7ebeaf'
            alt='img_2'
          />
        </div>
        <div className='loginRight'>
          <div className='logo'>
            <img
              className='logoImg'
              src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FLogo.png?alt=media&token=41e1c9b7-40bb-4b39-bf2c-ef09ab512ceb'
              alt='Logo'
            />
          </div>
          <form className='loginInput' method='post'>
            <div className='inputField'>
              <input  type='text' required />
              <span>Username</span>
            </div>
            <div className='inputField'>
              <input  type='password' required/>
              <span>Password</span>
            </div>
            <button className='loginButton'><p>Login</p></button>
          </form>
        </div>
      </div>
    </div>
  )
}
