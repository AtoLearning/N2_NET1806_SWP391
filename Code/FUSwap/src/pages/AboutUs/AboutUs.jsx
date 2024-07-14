import React from 'react'
import '../AboutUs/AboutUsStyle.css'
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className='about-us-contain'>
      <div className='about-us-content'>
        <div className='about-us-left'>
          <div className='left-1'>
            <h3>The Goal Of FUSwap</h3>
            <hr className='hr-text'/>
            <p>
              Give all FPT students access to a free website
              where they can post articles about learning supplies
              that they don't use but are still useful.
            </p>
            <p>
              Students who need these items can visit FUSwap to find the materials they need
              and get the contact information of the person who posted the item.
            </p>
          </div>
          <div className='left-2'>
            <img
              className='left-img'
              src="https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2"
              alt="image"
            />
            <img
              className='left-symbol'
              src="https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FSymbol.png?alt=media&token=e4b817f4-8816-4106-8649-7c8560029868"
              alt="symbol"
            />
          </div>
          <div className='left-3'>
            <h3>Contact Us</h3>
            <hr className='hr-text-1'/>
            <span className='box-contact-us'>
              <a
                href='https://www.facebook.com/FPTUHCMConfessions'
                target='_blank'
                title='Facebook'
              >
                <div><FaFacebookF className='footer_icon' /></div>
                <p>Facebook</p>
              </a>
              <a
                href='https://www.tiktok.com/@anhtuan.ht/video/7216695395848703259?q=%C3%B4i%20tr%E1%BB%9Di%20%C4%91%E1%BA%A5t%20%C6%A1i%20toi%20h%E1%BA%BFt%20ti%E1%BB%81n%20r&t=1718390954957'
                target='_blank'
                title='Tiktok'
              >
                <div><FaTiktok className='footer_icon' /></div>
                <p>Tiktok</p>
              </a>
              <a
                href='https://www.instagram.com/lalalalisa_m/'
                target='_blank'
                title='Instagram'
              >
                <div><FaInstagram className='footer_icon' /></div>
                <p>Instagram</p>
              </a>
            </span>
          </div>
        </div>
        <hr className='hr-about-us'/>
        <div className='about-us-right'>
          <div className='right-1'>
            <img 
            className='right-img'
            src="https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU_1.jpg?alt=media&token=9bd583e6-5ba3-474f-9385-f86f1c11acb2"
              alt="image"
            />
            <img
            className='right-symbol'
              src="https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FSymbol.png?alt=media&token=e4b817f4-8816-4106-8649-7c8560029868"
              alt="symbol"
            />
          </div>
          <div className='right-2'>
            <h3>Our Values</h3>
            <hr className='hr-text'/>
            <h2>Community:</h2>
            <p>We believe in fostering a strong community among FPT University students.</p>
            <h2>Sustainability:</h2>
            <p>By encouraging the reuse of study materials, we contribute to a more sustainable environment.</p>
            <h2>Accessibility:</h2>
            <p>Our platform is free and easy to use, ensuring that all students can benefit.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
