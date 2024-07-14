import React from 'react'
import '../Welcome/WelcomeStyle.css'

export default function Welcome() {
  return (
    <div className='welcome-contain'>
      <div className='welcome-content'>
        <div className='box-welcome'>
          <div className='box-img-welcome'>
            <img
              className='img-welcome'
              src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2Fwelcome.png?alt=media&token=341c1a11-565e-4881-9868-2344b4db0f20'
              alt='Welcome'
            />
          </div>
          <div className='welcome-text'>
            <p>Post the goods you want to sell or trade</p>
            <p>Buy or trade the items you need</p>
          </div>
        </div>

        <div className='box-welcome-img welcome-img-1'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FGoods_3.jpg?alt=media&token=82beb577-cf14-40f2-bcd7-7cb3be11c6ce'
            alt='image'
          />
          <div className='box-hr'>
            <hr className='hr-1' />
            <hr className='hr-2' />
          </div>
        </div>
        <div className='box-welcome-img welcome-img-2'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FGoods_2.jpg?alt=media&token=88e5c5b7-63f1-49a2-8df0-dcd3165410da'
            alt='image'
          />
          <div className='box-hr'>
            <hr className='hr-1' />
            <hr className='hr-2' />
          </div>
        </div>
        <div className='box-welcome-img welcome-img-3'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FGoods_1.jpg?alt=media&token=7ea586c2-f2c6-47cf-a7a9-30b773b7fa0d'
            alt='image'
          />
        </div>
        <div className='box-welcome-img welcome-img-4'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FGoods_4.jpg?alt=media&token=98343034-2f24-4e18-bb1d-c6581cd9fabf'
            alt='image'
          />
        </div>
      </div>
    </div>
  )
}
