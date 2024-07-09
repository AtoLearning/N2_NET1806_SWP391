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
    score: ".......",
    avatar: 'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FAnhDaiDienNu.jpg?alt=media&token=95e71a66-60a3-4a3d-b5d5-86b81b6bcdf1',
    fullName: 'Xxxxx Xxxx Xxxxx Xxxxx',
    phone: '0xx xxxx xxx',
    email: 'abcSExxxxxx@fpt.edu.vn',
    streetNumber: 'Abc Bca Cab',
    street: 'Abc Bca Cab',
    ward: 'Abc Bca Cab',
    district: 'Abc Bca Cab',
    city: 'Abc Bca Cab',
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

  return (
    <section className="student-card">
      <header className="header">
        <div className="student-info">
          <div className="avatar-container">
            <img
              loading="lazy"
              src={user.avatar}
              className="avatar"
              alt="Student avatar"
            />
          </div>

          <div className="name-score-container">
            <div className="name-score">
              <h2 className="student-name1">{user.name}</h2>
              <p className="student-score1">score: {user.score}</p>
            </div>
          </div>
        </div>
      </header>
      <main className="main-content">
        <div className="section-titles">
          <h3 className="info-title">Information:</h3>
          <h3 className="info-title">Feedback:</h3>
        </div>

        <div className="info-feedback-container">
          <div className="personal-info">
            <div className="full-name-container">
              <div className="full-name">
                <span className="full-name-label">Full name:</span>
                <span className="full-name-value">{user.fullName}</span>
              </div>
            </div>

            <div className="contact-info">
              <div className="contact-details">
                <div className="contact-item">
                  <p className="contact-label">Phone:</p>
                  <p className="contact-value">{user.phone}</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">Email:</p>
                  <p className="contact-value">{user.email}</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">StreetNumber:</p>
                  <p className="contact-value">{user.streetNumber}</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">Street:</p>
                  <p className="contact-value">{user.street}</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">Ward:</p>
                  <p className="contact-value">{user.ward}</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">District:</p>
                  <p className="contact-value">{user.district}</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">City:</p>
                  <p className="contact-value">{user.city}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="feedback-section1">
            <div className="feedback-content">
              {feedbacksToShow.map((feedback, index) => (
                <div className="feedback-item" key={index}>
                  <img
                    loading="lazy"
                    src={feedback.avatar}
                    className="feedback-avatar"
                    alt="Feedback avatar"
                  />
                  <div className="feedback-text">
                    <h4 className="feedback-title">{feedback.title}</h4>
                    <p className="feedback-type">{feedback.type}</p>
                    <p className="feedback-comment">{feedback.comment}</p>
                  </div>
                </div>
              ))}
              {user.feedbacks.length > 3 && (
                <a href="#" className="more-link">
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
