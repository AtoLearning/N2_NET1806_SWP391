import React, { useState } from 'react'
import '../MyPost/MyPostStyle.css'
import { Radio, RadioGroup } from '@nextui-org/react'
import { FaPlus } from 'react-icons/fa';
import { Link } from "react-router-dom"
import ShowPost from '../../components/ShowPost/ShowPost';
import SideBar from '../../components/SideBar/SideBar';

const product = [
  { PostID: 1, SpecialPostID: 'a1', Title: 'abc1 gfdhujkfndbhjjs fdsghjfsdjgfjsi', Content: 'vhsbvjdisjdifjskdbhjsdjbjdbbjdbjhbdsjbdbfgfnjgnjdfgfbvnjdnbviud', IsAvailable: true, IsExchange: false, UnitPrice: 10000, PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2' },
  { PostID: 2, SpecialPostID: 'a2', Title: 'abc2', Content: 'vhsbvjdisjdifjskdbhjsdjbjdbbjdbjhbdsjbdbfgfnjgnjdfgfbvnjdnbviud', IsAvailable: true, IsExchange: false, UnitPrice: 10000, PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2' },
  { PostID: 3, SpecialPostID: 'a3', Title: 'abc3', Content: 'vhsbvjdisjdifjskdbhjsdjbjdbbjdbjhbdsjbdbfgfnjgnjdfgfbvnjdnbviud', IsAvailable: true, IsExchange: true, PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2' },
  { PostID: 4, SpecialPostID: 'a4', Title: 'abc4', Content: 'vhsbvjdisjdifjskdbhjsdjbjdbbjdbjhbdsjbdbfgfnjgnjdfgfbvnjdnbviud', IsAvailable: true, IsExchange: false, UnitPrice: 10000, PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2' },
  { PostID: 5, SpecialPostID: 'a5', Title: 'abc5', Content: 'vhsbvjdisjdifjskdbhjsdjbjdbbjdbjhbdsjbdbfgfnjgnjdfgfbvnjdnbviud', IsAvailable: true, IsExchange: true, PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2' },
  { PostID: 6, SpecialPostID: 'a6', Title: 'abc6', Content: 'vhsbvjdisjdifjskdbhjsdjbjdbbjdbjhbdsjbdbfgfnjgnjdfgfbvnjdnbviud', IsAvailable: true, IsExchange: true, PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2' },
  { PostID: 7, SpecialPostID: 'a7', Title: 'abc7', Content: 'vhsbvjdisjdifjskdbhjsdjbjdbbjdbjhbdsjbdbfgfnjgnjdfgfbvnjdnbviud', IsAvailable: true, IsExchange: false, UnitPrice: 10000, PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2' },
  { PostID: 8, SpecialPostID: 'a8', Title: 'abc8', Content: 'vhsbvjdisjdifjskdbhjsdjbjdbbjdbjhbdsjbdbfgfnjgnjdfgfbvnjdnbviud', IsAvailable: true, IsExchange: true, PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2' },
  { PostID: 9, SpecialPostID: 'a9', Title: 'abc9', Content: 'vhsbvjdisjdifjskdbhjsdjbjdbbjdbjhbdsjbdbfgfnjgnjdfgfbvnjdnbviud', IsAvailable: true, IsExchange: false, UnitPrice: 10000, PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2' },
  { PostID: 10, SpecialPostID: 'a10', Title: 'abc10', Content: 'vhsbvjdisjdifjskdbhjsdjbjdbbjdbjhbdsjbdbfgfnjgnjdfgfbvnjdnbviud', IsAvailable: true, IsExchange: false, UnitPrice: 10000, PostImage: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FFPTU.jpeg?alt=media&token=16115063-0479-4763-a737-3a08e9f785d2' },
];

export default function MyPost() {
  const [selectedType, setSelectedType] = useState("None");
  const [selectedDay, setSelectedDay] = useState("None");
  const [selectedPrice, setSelectedPrice] = useState("None");
  return (
    <div className='postContainer'>
      <div className='post-left'>
        <SideBar />
      </div>
      <div className='post-right'>
        <div className='filterMenu'>
          <div className='boxFilterItem'>
            <div className='filterItem'>
              <span className='filterTittle'>Type</span>
              <div className='filterBody'>
                <RadioGroup
                  value={selectedType}
                  onValueChange={setSelectedType}
                >
                  <Radio value="Trade">Trade</Radio>
                  <Radio value="Sell">Sell</Radio>
                  <Radio value="None">None</Radio>
                </RadioGroup>
                <p className="text-default-500 text-small">Selected: {selectedType}</p>
              </div>
            </div>
          </div>

          <div className='boxFilterItem'>
            <div className='filterItem'>
              <span className='filterTittle'>Date</span>
              <div className='filterBody'>
                <RadioGroup
                  value={selectedDay}
                  onValueChange={setSelectedDay}
                >
                  <Radio value="Latest">Latest</Radio>
                  <Radio value="Oddest">Oldest</Radio>
                  <Radio value="None">None</Radio>
                </RadioGroup>
                <p className="text-default-500 text-small">Selected: {selectedDay}</p>
              </div>
            </div>
          </div>

          <div className='boxFilterItem'>
            <div className='filterItem'>
              <span className='filterTittle'>Price</span>
              <div className='filterBody'>
                <RadioGroup
                  value={selectedPrice}
                  onValueChange={setSelectedPrice}
                >
                  <Radio value="Ascending" >Ascending</Radio>
                  <Radio value="Decrease" >Decrease</Radio>
                  <Radio value="None" >None</Radio>
                </RadioGroup>
                <p className="text-default-500 text-small">Selected: {selectedPrice}</p>
              </div>
            </div>
          </div>

          <div className='box-btn'>
            <button className='createPost-btn btn-1'>
              <FaPlus className='icon-btn' />
              <Link to="/trade_post">
              Trade Post
            </Link>
            </button>
            <button className='createPost-btn btn-2'>
              <FaPlus className='icon-btn' />
              <Link to="/sell_post">
              Sell Post
            </Link>
            </button>
          </div>
        </div>

        <ShowPost product={product} />
      </div>
    </div>
  )
}
