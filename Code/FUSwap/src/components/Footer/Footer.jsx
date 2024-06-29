import React from 'react'
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import './FooterStyle.css';

export default function Footer() {
  return (
    <div className='footer'>
      <div>
        <img
          className='img_logo'
          src={'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FLogo.png?alt=media&token=41e1c9b7-40bb-4b39-bf2c-ef09ab512ceb'}
          alt="Logo"
        />
      </div>
      <div className='footer_content'>
        <div className='title'>
          <h2>Contacts</h2>
          <h2>Policy terms</h2>
          <h2>Follow Us</h2>
        </div>
        <div className='footer_hr'>
          <hr />
          <hr />
          <hr />
        </div>
        <div className='content'>
          <span>
            <p>01234567890</p>
            <p>Address: Lot E2a-7, Street D1, D. D1, Long Thanh My, Thu Duc City, Ho Chi Minh City</p>
          </span>
          <span>
            <a href=''>Policy on trading items</a>
            <a href=''>Policy on exchanging items</a>
          </span>
          <span>
            <a className='footer_a'
              href='https://www.facebook.com/FPTUHCMConfessions'
              target='_blank'
              title='Facebook'
            >
              <div className='icon_div_FB'><FaFacebookF className='footer_icon' /></div>
              <p>Facebook</p>
            </a>
            <a className='footer_a'
              href='https://www.tiktok.com/@anhtuan.ht/video/7216695395848703259?q=%C3%B4i%20tr%E1%BB%9Di%20%C4%91%E1%BA%A5t%20%C6%A1i%20toi%20h%E1%BA%BFt%20ti%E1%BB%81n%20r&t=1718390954957'
              target='_blank'
              title='Tiktok'
            >
              <div className='icon_div_TT'><FaTiktok className='footer_icon' /></div>
              <p>Tiktok</p>
            </a>
            <a className='footer_a'
              href='https://www.instagram.com/lalalalisa_m/'
              target='_blank'
              title='Instagram'
            >
              <div className='icon_div_IG'><FaInstagram className='footer_icon' /></div>
              <p>Instagram</p>
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

{/* <div className='footer_content'>
        <h2>Contacts</h2>
        <hr />
        <p>01234567890</p>
        <p>Address: Lot E2a-7, Street D1, D. D1, Long Thanh My, Thu Duc City, Ho Chi Minh City</p>

      </div>
      <div className='footer_content'>
        <h2>Policy terms</h2>
        <hr />
        <p className='footer_rule'>
          <a href=''>Policy on trading items</a>
          <a href=''>Policy on exchanging items</a>
        </p>
      </div>
      <div className='footer_follow_us, footer_content'>
        <h2>Follow Us</h2>
        <hr />
        <a className='footer_a'
          href='https://www.facebook.com/FPTUHCMConfessions'
          target='_blank'
          title='Facebook'
        >
          <div className='icon_div_FB'><FaFacebookF className='icon' /></div>
          <p>Facebook</p>
        </a>
        <a className='footer_a'
          href='https://www.tiktok.com/@anhtuan.ht/video/7216695395848703259?q=%C3%B4i%20tr%E1%BB%9Di%20%C4%91%E1%BA%A5t%20%C6%A1i%20toi%20h%E1%BA%BFt%20ti%E1%BB%81n%20r&t=1718390954957'
          target='_blank'
          title='Tiktok'
        >
          <div className='icon_div_TT'><FaTiktok className='icon' /></div>
          <p>Tiktok</p>
        </a>
        <a className='footer_a'
          href='https://www.instagram.com/lalalalisa_m/'
          target='_blank'
          title='Instagram'
        >
          <div className='icon_div_IG'><FaInstagram className='icon' /></div>
          <p>Instagram</p>
        </a>
      </div> */}