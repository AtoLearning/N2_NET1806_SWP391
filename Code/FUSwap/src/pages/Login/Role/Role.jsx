import React from 'react'
import '../Role/RoleStyle.css'
import { Link } from 'react-router-dom'

export default function Role() {
  return (
    <div className='role-contain'>
      <div className='role-content'>
      <img
          className='img-1'
          src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFUSwap.png?alt=media&token=ca7250ef-8c01-4523-9541-573559b8348b'
          alt='FUSwap'
        />
        <div className='box-link'>
          <Link to="/login_manager" className='role-link link-1'>Login As Manager</Link>
          <Link to="/login_customer" className='role-link link-2'>Login As Customer</Link>
        </div>
        <img
          className='img-2'
          src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FSymbol.png?alt=media&token=e4b817f4-8816-4106-8649-7c8560029868'
          alt='FUSwap'
        />
        <img
          className='img-3'
          src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FSymbol.png?alt=media&token=e4b817f4-8816-4106-8649-7c8560029868'
          alt='FUSwap'
        />
      </div>
    </div>
  )
}
