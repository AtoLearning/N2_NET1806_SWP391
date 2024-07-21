import React, {useState} from 'react'
import '../LoginManager/LoginManagerStyle.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";

const baseURL = "http://localhost:8080/api/v1/perform_login";

export default function LoginManager() {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseURL, {username, password}, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      })
      if (response.status === 200 && response.data.status === 'Login successful') {
        navigate('/m/moderate/posts')
        window.location.reload();
      }

    } catch (error) {
      setError(error.response.data.status)
      if(error.response.status === 401 && error.response.data.status === 'Login failed') {
        navigate('/m/login?error=true')
      }
    }
  }

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
          <form className='loginInput' onSubmit={handleSubmit}>
            <div className='inputField'>
              <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} required/>
              <span>Username</span>
            </div>
            <div className='inputField'>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              <span>Password</span>
            </div>
            {/*<button className='loginButton' type="submit"><p>Login</p></button>*/}
            <button className='loginButton' type="submit">Login</button>
          </form>
          {error && <p style={{color: "red"}}>{error}</p>}
        </div>
      </div>
    </div>
  )
}
