import PropTypes from 'prop-types';
import './UserInformStyle.css';
import {FaGem, FaLeaf, FaSeedling, FaTree} from "react-icons/fa";
import {useState} from "react";

const UserInform = ({ customerViewDto, streetNumber, street, wardName, districtName, cityName}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 3;

  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = customerViewDto.feedbackDtoList.slice(indexOfFirstFeedback, indexOfLastFeedback);

  const paginatePrev = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const paginateNext = () => {
    setCurrentPage(currentPage < Math.ceil(customerViewDto.feedbackDtoList.length / feedbacksPerPage) ? currentPage + 1 : currentPage);
  };

  let backgroundColor, borderColor, textColor, rankIcon;
  if (customerViewDto.rank === 'Gold') {
    backgroundColor = '#00539c';
    borderColor = '#ffd000';
    textColor = '#FFD700';
    rankIcon = <FaSeedling />;
  } else if (customerViewDto.rank === 'Silver') {
    backgroundColor = '#747273';
    borderColor = '#EFEFEF';
    textColor = '#EFEFEF';
    rankIcon = <FaLeaf />;
  } else if (customerViewDto.rank === 'Diamond') {
    backgroundColor = '#00203FFF';
    borderColor = '#adcaef';
    textColor = '#7cf6f6';
    rankIcon = <FaTree />;
  }

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
               <p className="UIF-rank">
                 <span className='UIF-rank-title'
                       style={{
                         backgroundColor,
                         border: `2px solid ${borderColor}`,
                         color: textColor,
                         fontWeight: "bolder"
                       }}
                 >
                   {customerViewDto.rank}&ensp;
                   {rankIcon}
                 </span>
               </p>
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
                  <span className="UIF-fullname-label">Full name:</span>
                  <span className="UIF-fullname-value">{customerViewDto.givenName}</span>
                </div>
                <div className="UIF-contact-item">
                  <p className="UIF-contact-label">Phone:</p>
                  <p className="UIF-contact-value">{customerViewDto.phone}</p>
                </div>
                <div className="UIF-contact-item">
                  <p className="UIF-contact-label">Email:</p>
                  <p className="UIF-contact-value">{customerViewDto.cuserName}</p>
                </div>
                <div className="UIF-fullname">
                  <span className="UIF-fullname-label">Nickname:</span>
                  <span className="UIF-fullname-value">{customerViewDto.nickname}</span>
                </div>
                <div className="UIF-fullname">
                  <span className="UIF-fullname-label">Gender:</span>
                  <span className="UIF-fullname-value">{customerViewDto.gender}</span>
                </div>
                <div className="UIF-contact-item">
                  <p className="UIF-contact-label">Points:</p>
                  <p className="UIF-contact-value">{customerViewDto.points}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="UIF-feedback-section">
            <div className="UIF-feedback-content">
              {customerViewDto.feedbackDtoList.length === 0 ? (
                  <p>No feedback available.</p>
              ) : (
                  currentFeedbacks.map((feedback, index) => (
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
              )))}
            </div>
            {customerViewDto.feedbackDtoList.length > 0 && (
                <div className="UIF-pagination">
                  <button
                      className={`UIF-pagination-btn ${currentPage === 1 ? 'disabled' : 'active'}`}
                      onClick={paginatePrev}
                  >
                    Previous
                  </button>
                  <button
                      className={`UIF-pagination-btn ${currentPage === Math.ceil(customerViewDto.feedbackDtoList.length / feedbacksPerPage) ? 'disabled' : 'active'}`}
                      onClick={paginateNext}
                  >
                    Next
                  </button>
                </div>
            )}
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
    rank: PropTypes.string,
    points: PropTypes.number,
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
