import React, { useState } from 'react';
import PropTypes from "prop-types";

const Message = ({ message }) => {
  const [isActive, setIsActive] = useState(false);
  // date
  // from
  const { subject, authResults, body } = message;


  return (
    <div className="message-item">
      <div className="message-title" onClick={() => setIsActive(!isActive)}>
        <div className="message-title-label">
          <div>Name</div>
          <div>{subject.substring(0, 30)}...</div>
          <div>14/09/1993</div>
        </div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="message-content">
        <div></div>
      </div>}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
      from: PropTypes.shape({
          email: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
      }).isRequired,
      subject: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      authResults: PropTypes.shape({
        DKIM: PropTypes.string.isRequired,
        DMARC: PropTypes.string.isRequired,
        SPF: PropTypes.string.isRequired
      }).isRequired,
      body: PropTypes.string.isRequired
  })
}

export default Message;