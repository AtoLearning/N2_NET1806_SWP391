import PropTypes from 'prop-types';
import './UserInformStyle.css';

const UserInform = ({ customerViewDto, streetNumber, street, wardName, districtName, cityName}) => {

  // Lấy từ 1 đến 3 feedbacks
  const feedbacksToShow = customerViewDto.feedbackDtoList.slice(0, 3);
  console.log(feedbacksToShow);

  // Xác định màu nền, viền và chữ dựa trên rank
  // let backgroundColor, borderColor, textColor;
  // if (user.rank === 'Gold') {
  //   backgroundColor = '#00539c'; 
  //   borderColor = '#FFD700'; 
  //   textColor = '#FFD700';
  // } else if (user.rank === 'Silver') {
  //   backgroundColor = '#747273'; 
  //   borderColor = '#EFEFEF'; 
  //   textColor = '#EFEFEF'; 
  // } else if (user.rank === 'Diamond') {
  //   backgroundColor = '#00203FFF'; 
  //   borderColor = '#ADEFD1FF'; 
  //   textColor = '#ADEFD1FF'; 
  // } else {
  //   backgroundColor = '#fff'; // Mặc định màu trắng nếu không có rank
  //   borderColor = '#000'; // Border mặc định màu đen
  //   textColor = '#000'; // Màu đen cho chữ
  // }

  return (
    <section className="UIF-card">
      <header className="UIF-header" >
        <div className="UIF-info">
          <div className="UIF-avatar-container">
            <img
              loading="lazy"
              src={customerViewDto.avatar}
              className="UIF-avatar"
              alt="Student avatar"
            />
          </div>

          <div className="UIF-level-container">
            <div className="UIF-level">
              <h2 className="UIF-student-name">{customerViewDto.givenName}</h2>
              {/* <p className="UIF-rank">Rank:<span className='UIF-rank-title'  style={{ backgroundColor, border: `2px solid ${borderColor}`, color: textColor }}> {customerViewDto.givenName}</span></p>  */}
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
                  <span className="UIF-fullname-value" >user.fullName</span>
                </div>
                <div className="UIF-contact-item">
                  <p className="UIF-contact-label" >Phone:</p>
                  <p className="UIF-contact-value" >user.phone</p>
                </div>
                <div className="UIF-contact-item">
                  <p className="UIF-contact-label" >Email:</p>
                  <p className="UIF-contact-value" >user.email</p>
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
                    src={feedback.consumerAvatar}
                    className="UIF-feedback-avatar"
                    alt="Feedback avatar"
                  />
                  <div className="UIF-feedback-text">
                    <h4 className="UIF-feedback-title">{feedback.feedbackTitle}</h4>
                    <p className="UIF-feedback-type">{feedback.isExchange ? "Exchange" : "Sell"}</p>
                    <p className="UIF-feedback-comment">{feedback.content}</p>
                  </div>
                </div>
              ))}
              {customerViewDto.feedbackDtoList.length > 3 && (
                <a href="#" className="UIF-more-link">
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
UserInform.propTypes = {
  customerViewDto: PropTypes.shape({
    avatar: PropTypes.string,
    givenName: PropTypes.string,
    phone: PropTypes.string,
    cuserName: PropTypes.string,
    feedbackDtoList: PropTypes.arrayOf(
        PropTypes.shape({
          feedbackId: PropTypes.number.isRequired,
          consumerAvatar: PropTypes.string.isRequired,
          feedbackTitle: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
          isExchange: PropTypes.bool.isRequired,
        })
    ).isRequired,
  }).isRequired,
  streetNumber: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  wardName: PropTypes.string.isRequired,
  districtName: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
};
export default UserInform;
