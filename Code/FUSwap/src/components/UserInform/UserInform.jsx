import PropTypes from 'prop-types';
import './UserInformStyle.css';

const UserInform = ({ customerViewDto, streetNumber, street, wardName, districtName, cityName}) => {

  // Lấy từ 1 đến 3 feedbacks
  const feedbacksToShow = customerViewDto.feedbackDtoList.slice(0, 3);
  console.log(feedbacksToShow);

  return (
    <section className="student-card">
      <header className="header">
        <div className="student-info">
          <div className="avatar-container">
            <img
              loading="lazy"
              src={customerViewDto.avatar}
              className="avatar"
              alt="Student avatar"
            />
          </div>

          <div className="name-score-container">
            <div className="name-score">
              <h2 className="student-name1">{customerViewDto.givenName}</h2>
              <p className="student-score1">score: </p>
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
                <span className="full-name-value">{customerViewDto.givenName}</span>
              </div>
            </div>

            <div className="contact-info">
              <div className="contact-details">
                <div className="contact-item">
                  <p className="contact-label">Phone:</p>
                  <p className="contact-value">{customerViewDto.phone}</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">Email:</p>
                  <p className="contact-value">{customerViewDto.cuserName}</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">StreetNumber:</p>
                  <p className="contact-value">{streetNumber}</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">Street:</p>
                  <p className="contact-value">{street}</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">Ward:</p>
                  <p className="contact-value">{wardName}</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">District:</p>
                  <p className="contact-value">{districtName}</p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">City:</p>
                  <p className="contact-value">{cityName}</p>
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
                    src={feedback.consumerAvatar}
                    className="feedback-avatar"
                    alt="Feedback avatar"
                  />
                  <div className="feedback-text">
                    <h4 className="feedback-title">{feedback.feedbackTitle}</h4>
                    <p className="feedback-type">{feedback.isExchange ? "Exchange" : "Sell"}</p>
                    <p className="feedback-comment">{feedback.content}</p>
                  </div>
                </div>
              ))}
              {customerViewDto.feedbackDtoList.length > 3 && (
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
