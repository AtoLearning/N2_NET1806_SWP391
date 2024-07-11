import {useState} from 'react'
import '../MyPost/MyPostStyle.css'
import { Radio, RadioGroup } from '@nextui-org/react'
import { FaPlus } from 'react-icons/fa';
import {Link} from "react-router-dom"
import ShowPost from '../../components/ShowPost/ShowPost';
import SideBar from '../../components/SideBar/SideBar';

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
              <Link to="/c/trade-post">
              Trade Post
            </Link>
            </button>
            <button className='createPost-btn btn-2'>
              <FaPlus className='icon-btn' />
              <Link to="/c/sell-post">
              Sell Post
            </Link>
            </button>
          </div>
        </div>

        <ShowPost />
      </div>
    </div>
  )
}
