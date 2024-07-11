import React, {useEffect, useState} from 'react'
import '../ShowPost/ShowPostStyle.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import UserInform from "../UserInform/UserInform.jsx";
import * as propTypes from "prop-types";
const baseURL = "http://localhost:8080/api/v1/customer/permission/my-posts";
export default function ShowPost() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const getAllPosts = async (page) => {
        try {
            const response = await axios.get(baseURL, {
                params: {
                    pageNo: page,
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setPosts(response.data.obj);
                setTotalPages(response.data.totalPages);
            }
            console.log(response.status)
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 403) {
                navigate('/not-found');
            }
            else if(error.response && error.response.status === 401){
                navigate('/role');
            }
        }
    };

    useEffect(() => {
        getAllPosts(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    console.log(posts)
  return (
      <>
          <div className='product'>
              {Array.isArray(posts) && posts.length > 0 ? (
                  posts.map((post) => (
                      <div key={post.postId} className='card'>
                          <div className='imgBox'>
                              <img
                                  className='proImg'
                                  src={post.postImage}
                                  alt='ProductImage'
                              />
                          </div>
                          <div className='detail'>
                              <h3>{post.title}</h3>
                              <span className='text'>
                    <p>PostID:</p>
                    <p>{post.specialPostId}</p>
                  </span>
                              <p className='proContent'>
                                  {post.postContent}
                              </p>
                              <span>
                    {post.isExchange === true ?
                        <span className='text type'>Trade</span> :
                        <span className='text type'>{post.unitPrice}</span>
                    }
                  </span>
                          </div>
                      </div>
                  ))
              ) : (
                  <div className="no-data">No data!!!</div>
              )}
          </div>
          <div style={{textAlign: 'center', marginTop: '20px'}}>
              <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                  Previous
              </button>
              <span style={{margin: '0 10px'}}>{page} / {totalPages}</span>
              <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
                  Next
              </button>
          </div>
      </>

  )
}
