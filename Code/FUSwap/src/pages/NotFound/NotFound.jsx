import React from 'react'
import '../NotFound/NotFoundStyle.css'

export default function NotFound() {
  return (
    <div className='not-found-contain'>
        <div className='logo-not-found'>
            <img
            className='img-not-found'
            src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FNotFoundLogo.png?alt=media&token=893ca929-e920-42a9-b570-b4e08e5e9fe4'
            alt='NotFound'
            />
        </div>
        <div className='img-box '>
            <img
            className='img-not-found'
            src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2Ferror404.png?alt=media&token=58a73be1-41c4-485f-ba65-4f3c028ab48d'
            alt='NotFound'
            />
            <a href='http://localhost:3000/home'>
                Go to our home page
            </a>
        </div>
    </div>
  )
}
