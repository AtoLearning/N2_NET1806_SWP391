import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok} from "react-icons/fa";
import './FooterStyle.css';

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer_detail'>
        <img 
        className='img_logo' 
        src={'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FWebLogoFUS.png?alt=media&token=4a3367e1-dd52-4715-82e9-ebc80ca60ede'} 
        alt="Logo" 
        />
        <p>Goods Exchange Application for students at FU</p>
      </div>
      <div className='footer_contact, footer_content'>
        <div><h2>Contact</h2></div>
        <hr/>
        <div><p>01234567890</p></div>
        <div>
          <p>Address: Lot E2a-7, Street D1, D. D1, Long Thanh My, Thu Duc City, Ho Chi Minh City</p>
        </div>
      </div>
      <div className='footer_rule, footer_content'>
        <div><h2>Rule</h2></div>
        <hr/>
        <div><p>Policy on trading items</p></div>
        <div><p>Policy on exchanging items</p></div>
      </div>
      <div className='footer_follow_us, footer_content'>
        <div><h2>Follow Us</h2></div>
        <hr/>
        <a className='footer_a' 
        href='https://www.facebook.com/FPTUHCMConfessions' 
        target='_blank' 
        title='Facebook'
        > 
          <p><FaFacebook className='icon' /></p>
          <p>Facebook</p>
        </a>
        <a className='footer_a' 
        href='https://www.tiktok.com/@anhtuan.ht/video/7216695395848703259?q=%C3%B4i%20tr%E1%BB%9Di%20%C4%91%E1%BA%A5t%20%C6%A1i%20toi%20h%E1%BA%BFt%20ti%E1%BB%81n%20r&t=1718390954957'
        target='_blank' 
        title='Tiktok'
        >
          <p><FaTiktok className='icon' /></p>
          <p>Tiktok</p>
        </a>
        <a className='footer_a' 
        href='https://www.instagram.com/lalalalisa_m/'
        target='_blank'
        title='Instagram'
        >
          <p><FaInstagram className='icon'/></p>
          <p>Instagram</p>
        </a>
      </div>
    </div>
  )
}
