import React from 'react'
import './ListPostStyle.css'
import { FaSearch } from 'react-icons/fa';

export default function ListPost() {
    const posts = [
        {
            avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNam.jpg?alt=media&token=3d50445b-94f0-4631-ad57-a756e436ca0b',
            email: 'nnnaaasexxxxx1@fpt.edu.vn',
            fullName: 'Nguyen Nguyen Nguyen Nguyen Ng',
            title: 'ABCDE FGHJ AAAAA BBFGHJ AAAAA FGHJ AA AF...',
            date: '10-08-2023'
        },
        {
            avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNam.jpg?alt=media&token=3d50445b-94f0-4631-ad57-a756e436ca0b',
            email: 'nnnaaasexxxxx2@fpt.edu.vn',
            fullName: 'Nguyen Nguyen Nguyen Nguyen Ng',
            title: 'ABCDE FGHJ AAAAA BBFGHJ AAAAA FGHJ AA AF...',
            date: '10-08-2023'
        },
        {
            avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNam.jpg?alt=media&token=3d50445b-94f0-4631-ad57-a756e436ca0b',
            email: 'nnnaaasexxxxx3@fpt.edu.vn',
            fullName: 'Nguyen Nguyen Nguyen Nguyen Ng',
            title: 'ABCDE FGHJ AAAAA BBFGHJ AAAAA FGHJ AA AF...',
            date: '10-08-2023'
        },
        {
            avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNam.jpg?alt=media&token=3d50445b-94f0-4631-ad57-a756e436ca0b',
            email: 'nnnaaasexxxxx4@fpt.edu.vn',
            fullName: 'Nguyen Nguyen Nguyen Nguyen Ng',
            title: 'ABCDE FGHJ AAAAA BBFGHJ AAAAA FGHJ AA AF...',
            date: '10-08-2023'
        },
        {
            avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNam.jpg?alt=media&token=3d50445b-94f0-4631-ad57-a756e436ca0b',
            email: 'nnnaaasexxxxx5@fpt.edu.vn',
            fullName: 'Nguyen Nguyen Nguyen Nguyen Ng',
            title: 'ABCDE FGHJ AAAAA BBFGHJ AAAAA FGHJ AA AF...',
            date: '10-08-2023'
        },
        {
            avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNam.jpg?alt=media&token=3d50445b-94f0-4631-ad57-a756e436ca0b',
            email: 'nnnaaasexxxxx6@fpt.edu.vn',
            fullName: 'Nguyen Nguyen Nguyen Nguyen Ng',
            title: 'ABCDE FGHJ AAAAA BBFGHJ AAAAA FGHJ AA AF...',
            date: '10-08-2023'
        }
    ];

    return (
        <div className='list-post-contain'>
            <div className='list-post-content'>
                <form className='list-post-header'>
                    <div>
                        <label>Email:</label>
                        <input
                            type='text'
                            name='email'
                        // value={''}
                        />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input
                            type='date'
                            name='date'
                            value={''}
                        />
                    </div>
                    <button>
                        <FaSearch className='list-post-search' />
                        <img
                            src='https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FSymbol.png?alt=media&token=e4b817f4-8816-4106-8649-7c8560029868'
                            alt='symbol'
                        />
                    </button>
                </form>
                <table className='list-post-table'>
                    <thead>
                        <tr>
                            <th className='Avatar'>Avatar</th>
                            <th className='Email'>Email</th>
                            <th className='FullName'>Fullname</th>
                            <th className='Title'>Title</th>
                            <th className='Date'>Date</th>
                            <th className='Action'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr>
                                <td className='box-avatar'>
                                    <img
                                        className='user-avatar'
                                        src={post.avatar}
                                        alt='avatar'
                                    />
                                </td>
                                <td className='box-style-1'>
                                    <p>{post.email}</p>
                                </td>
                                <td className='box-style-1'>
                                    <p>{post.fullName}</p>
                                </td>
                                <td className='box-style-1'>
                                    <p>{post.title}</p>
                                </td>
                                <td className='box-style-2'>
                                    <p>{post.date}</p>
                                </td>
                                <td className='box-style-2'>
                                    <button className='list-post-btn' onClick={''}>View more</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
