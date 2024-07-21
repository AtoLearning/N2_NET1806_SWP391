import React, {useEffect, useState} from 'react'
import '../ShowPost/ShowPostStyle.css'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import UserInform from "../UserInform/UserInform.jsx";
import * as propTypes from "prop-types";
const baseURL = "http://localhost:8080/api/v1/customer/permission/my-posts";
export default function ShowPost({postStatus, sortDate}) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const getAllPosts = async (page, postStatus, sortDate) => {
        try {
            const response = await axios.get(baseURL, {
                params: {
                    pageNo: page,
                    postStatus: postStatus,
                    sortDate: sortDate,
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setPosts(response.data.obj);
                setTotalPages(response.data.totalPages);
            } else if (response.status === 204) {
                setPosts(null)
            }
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
        getAllPosts(page, postStatus, sortDate);
    }, [page, postStatus, sortDate]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    const handlePostReadonlyClick = (post) => {
        navigate('/c/post-readonly', { state: { goodsPost: post } });
    }
    const handleUpdatePostClick = (postId) => {
        navigate(`/c/update-post/${postId}`);
    }
  return (
      <>
          <div className='product'>
              {Array.isArray(posts) && posts.length > 0 ? (
                  posts.map((post) => (
                      <React.Fragment key={post.postId}>
                      {post.postStatus === "Rejected" || post.postStatus === "Transacted" ? (
                              <>
                                  <div className='card' onClick={() => handlePostReadonlyClick(post)}>
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
                                          <span><span className='text type'>{post.postStatus}</span></span>
                                      </div>
                                  </div>
                              </>
                          ) : (
                              <>
                                  <div className='card' onClick={() => handleUpdatePostClick(post.postId)}>
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
                                          <span><span className='text type'>{post.postStatus}</span></span>
                                      </div>
                                  </div>
                              </>
                      )}
                      </React.Fragment>
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
