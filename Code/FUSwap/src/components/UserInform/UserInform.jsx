import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserInformStyle.css';  // Đảm bảo import file CSS

const apiUrl = "http://localhost:8080/api/v1/guest/user/1"; // URL API để lấy dữ liệu người dùng thực tế

const UserInform = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useSampleData, setUseSampleData] = useState(true); // State để kiểm tra có sử dụng dữ liệu mẫu hay không

  // Dữ liệu mẫu
  const sampleData = {
    name: "Student's name",
    avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1',
    fullName: 'Xxxxx Xxxx Xxxxx Xxxxx',
    phone: '0xx xxxx xxx',
    email: 'abcSExxxxxx@fpt.edu.vn',
    streetNumber: 'Abc Bca Cab',
    street: 'Abc Bca Cab',
    ward: 'Abc Bca Cab',
    district: 'Abc Bca Cab',
    city: 'Abc Bca Cab',
    point: 12,
    rank: "Silver", // Thêm rank vào dữ liệu mẫu
    feedbacks: [
      {
        avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/aa4dad9768dcd770e0f35fa48082b99b20d8231e7533f4ccc8fd6041a47d14a0?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&',
        title: "Goods' Tittle",
        type: 'Trade',
        comment: "That's great"
      },
      {
        avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/aa4dad9768dcd770e0f35fa48082b99b20d8231e7533f4ccc8fd6041a47d14a0?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&',
        title: "Goods' Tittle",
        type: 'Sell',
        comment: "That's great"
      },
      {
        avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/aa4dad9768dcd770e0f35fa48082b99b20d8231e7533f4ccc8fd6041a47d14a0?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&',
        title: "Goods' Tittle",
        type: 'Trade',
        comment: "That's great"
      },
      {
        avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/aa4dad9768dcd770e0f35fa48082b99b20d8231e7533f4ccc8fd6041a47d14a0?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&',
        title: "Goods' Tittle",
        type: 'Sell',
        comment: "That's great"
      }
    ]
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (useSampleData) {
        // Sử dụng dữ liệu mẫu và đặt loading thành false
        setUser(sampleData);
        setLoading(false);
      } else {
        try {
          const response = await axios.get(apiUrl, {
            withCredentials: true
          });
          if (response.status === 200) {
            setUser(response.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [useSampleData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Lấy từ 1 đến 3 feedbacks
  const feedbacksToShow = user.feedbacks.slice(0, 3);

  // Xác định màu nền, viền và chữ dựa trên rank
  let backgroundColor, borderColor, textColor;
  if (user.rank === 'Gold') {
    backgroundColor = '#00539c'; 
    borderColor = '#FFD700'; 
    textColor = '#FFD700';
  } else if (user.rank === 'Silver') {
    backgroundColor = '#747273'; 
    borderColor = '#EFEFEF'; 
    textColor = '#EFEFEF'; 
  } else if (user.rank === 'Diamond') {
    backgroundColor = '#00203FFF'; 
    borderColor = '#ADEFD1FF'; 
    textColor = '#ADEFD1FF'; 
  } else {
    backgroundColor = '#fff'; // Mặc định màu trắng nếu không có rank
    borderColor = '#000'; // Border mặc định màu đen
    textColor = '#000'; // Màu đen cho chữ
  }

  return (
    <section className="UIF-card">
      <header className="UIF-header" >
        <div className="UIF-info">
          <div className="UIF-avatar-container">
            <img
              loading="lazy"
              src={user.avatar}
              className="UIF-avatar"
              alt="Student avatar"
            />
          </div>

          <div className="UIF-level-container">
            <div className="UIF-level">
              <h2 className="UIF-student-name">{user.name}</h2>
              <p className="UIF-rank">Rank:<span className='UIF-rank-title'  style={{ backgroundColor, border: `2px solid ${borderColor}`, color: textColor }}> {user.rank}</span></p>
            </div>
          </div>
        </div>
      </header>
      <main className="UIF-main-content">
        <div className="UIF-section-titles">
          <h3 className="UIF-info-title" >Information:</h3>
          <h3 className="UIF-info-title" >Feedback:</h3>
        </div>

        <div className="UIF-feedback-container">
          <div className="UIF-personal-info">
            <div className="UIF-contact-info">
              <div className="UIF-contact-details">
                <div className="UIF-fullname">
                  <span className="UIF-fullname-label" >Full name:</span>
                  <span className="UIF-fullname-value" >{user.fullName}</span>
                </div>
                <div className="UIF-contact-item">
                  <p className="UIF-contact-label" >Phone:</p>
                  <p className="UIF-contact-value" >{user.phone}</p>
                </div>
                <div className="UIF-contact-item">
                  <p className="UIF-contact-label" >Email:</p>
                  <p className="UIF-contact-value" >{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="UIF-feedback-section">
            <div className="UIF-feedback-content">
              {feedbacksToShow.map((feedback, index) => (
                <div className="UIF-feedback-item" key={index}>
                  <img
                    loading="lazy"
                    src={feedback.avatar}
                    className="UIF-feedback-avatar"
                    alt="Feedback avatar"
                  />
                  <div className="UIF-feedback-text" >
                    <h4 className="UIF-feedback-title">{feedback.title}</h4>
                    <p className="UIF-feedback-type">{feedback.type}</p>
                    <p className="UIF-feedback-comment">{feedback.comment}</p>
                  </div>
                </div>
              ))}
              {user.feedbacks.length > 3 && (
                <a href="#" className="UIF-more-link" style={{ color: textColor }}>
                  More &gt;&gt;
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default UserInform;
