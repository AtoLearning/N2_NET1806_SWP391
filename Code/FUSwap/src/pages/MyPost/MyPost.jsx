import {useState} from 'react'
import '../MyPost/MyPostStyle.css'
import { Radio, RadioGroup } from '@nextui-org/react'
import { FaPlus } from 'react-icons/fa';
import {Link} from "react-router-dom"
import ShowPost from '../../components/ShowPost/ShowPost';
import SideBar from '../../components/SideBar/SideBar';

export default function MyPost() {
  const [selectedType, setSelectedType] = useState("None");
  const [selectedDay, setSelectedDay] = useState("Newest");

  return (
    <div className='postContainer'>
      <div className='post-left'>
        <SideBar />
      </div>
      <div className='post-right'>
        <div className='filterMenu'>
          <div className='boxFilterItem' style={{width:'50%'}}>
            <div className='filterItem'>
              <span className='filterTittle'>Post Status</span>
              <div className='filterBody'>
                <RadioGroup
                    value={selectedType}
                    onValueChange={setSelectedType}
                >
                  <div className='radio-columns'>
                    <div className='radio-column'>
                      <Radio value="Approving">Approving</Radio>
                      <Radio value="Approved">Approved</Radio>
                      <Radio value="Rejected">Rejected</Radio>
                    </div>
                    <div className='radio-column'>
                      <Radio value="Transacted">Transacted</Radio>
                      <Radio value="None">None</Radio>
                    </div>
                  </div>
                </RadioGroup>
                <p className="text-default-500 text-small">Selected: {selectedType}</p>
              </div>
            </div>
          </div>

          <div className='boxFilterItem'>
            <div className='filterItem'>
              <span className='filterTittle'>Create date</span>
              <div className='filterBody'>
                <RadioGroup
                    value={selectedDay}
                    onValueChange={setSelectedDay}
                >
                  <Radio value="Newest">Newest</Radio>
                  <Radio value="Oldest">Oldest</Radio>
                </RadioGroup>
                <p className="text-default-500 text-small">Selected: {selectedDay}</p>
              </div>
            </div>
          </div>

          <div className='box-btn'>
            <button className='createPost-btn-no-hover'>
              <FaPlus className='icon-btn' />
              <Link to="/c/goods-post">
                Goods Post
              </Link>
            </button>
          </div>
        </div>

        <ShowPost
          postStatus={selectedType}
          sortDate={selectedDay}
        />
      </div>
    </div>
  )
}
