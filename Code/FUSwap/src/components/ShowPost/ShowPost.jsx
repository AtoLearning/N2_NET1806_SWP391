import React from 'react'
import '../ShowPost/ShowPostStyle.css'

export default function ShowPost({product}) {
    
  return (
    <div className='product'>
        {product.map((proItem) => (
          <div key={proItem.PostID} className='card'>
            <div className='imgBox'>
              <img
                className='proImg'
                src={proItem.PostImage}
                alt='ProductImage'
              />
            </div>
            <div className='detail'>
              <h3>{proItem.Title}</h3>
              <span className='text'>
                <p>PostID:</p>
                <p>{proItem.SpecialPostID}</p>
              </span>
              <p className='proContent'>
                {proItem.Content}
              </p>
              <span >
                {proItem.IsExchange === true ?
                  <span className='text type'>Trade</span> :
                  <span className='text type'>{proItem.UnitPrice}</span>
                }
              </span>
            </div>
          </div>
        ))}
      </div>
  )
}
