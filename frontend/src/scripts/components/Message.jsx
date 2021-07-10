import React, { useState } from 'react';
import PropTypes from "prop-types";

const Message = ({ message }) => {
  const [isActive, setIsActive] = useState(false);
  const { from: { name, email }, subject, authResults, body, date, geoCode } = message;
  console.log(geoCode)
  const isAuthResultValid = (result) => {
    if (!authResults) {
      return false
    }
    return authResults[result] === 'pass' || authResults[result] === 'bestguesspass'
  }
  return (
    <div className="message-item">
      <div className="message-title" onClick={() => setIsActive(!isActive)}>
        <div className="message-title-label">
          <div>{name}</div>
          <div>{subject.substring(0, 30)}...</div>
          <div>{date}</div>
        </div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="message-content">
        <div>{email}</div>
        <div>Pass DKIM validation: {isAuthResultValid('DKIM') ? '✓' : '×'} </div>
        <div>Pass DMARC validation: {isAuthResultValid('DMARC') ? '✓' : '×'}</div>
        <div>Pass SPF validation: {isAuthResultValid('SPF') ? '✓' : '×'}</div>
        <div>Email Text: {body.substring(0, 200)}...</div>
        {geoCode && <div>Geo: {geoCode.city + ' ' + geoCode.country_name}</div>}
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
      body: PropTypes.string.isRequired,
      geoCode: PropTypes.any.isRequired
  })
}

export default Message;