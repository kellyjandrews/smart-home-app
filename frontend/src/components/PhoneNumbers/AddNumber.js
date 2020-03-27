import React, { useState } from 'react';
import { db, fb } from '../../context/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function AddNumber({ setNumber, toggle }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  function _handleSubmit(e) {
    e.preventDefault();
    // need to validate the phone number here at some point
    let data = {
      owner: fb.auth().currentUser.uid,
      verified: false,
    };
    db.collection('phoneNumbers').doc(phoneNumber).set(data);
    toggle(false)
    setNumber(phoneNumber);
  }

  return (
      <div className="empty" id="addNumber">
        <div className="panel-close">
          <FontAwesomeIcon onClick={() => toggle(false)} icon={faTimes} size="2x" />
        </div>
        <div className="panel-header">
          <div className="panel-title h5">Add Phone Number</div>
        </div>
        <div className="panel-body">
          <input
            className="form-input"
            type="text"
            id="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="panel-footer">
        <button className="btn btn-primary" onClick={_handleSubmit}>Send Verification Code</button>
        </div>
      </div>
  )
}

export default AddNumber;
