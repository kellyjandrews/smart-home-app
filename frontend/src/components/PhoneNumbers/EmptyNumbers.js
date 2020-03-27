import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

function EmptyNumbers({ toggle }) {
  
  return (
    <div className="empty">
      <div className="empty-icon">
        <FontAwesomeIcon icon={faMobileAlt} size="4x" />
      </div>
      <p className="empty-title h5">You have no phone numbers</p>
      <p className="empty-subtitle">Click to add a phone number.</p>
      <div className="empty-action">
        <button className="btn btn-primary" onClick={() => toggle(true)}>Add Phone Number</button>
      </div>
    </div>
  )
}

export default EmptyNumbers;