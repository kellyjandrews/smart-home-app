import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { functions } from '../../context/firebase';

function VerifyNumber({ toggle, number, list }) {
  let value = list.filter((n) => n.id === number);
  const [code, setCode] = useState('');

  function _handleSubmit(e) {
    e.preventDefault();
    var checkVerify = functions.httpsCallable('checkVerify');
    checkVerify({ code: code, req_id: value[0]?.data().req_id, phoneNumber: value[0]?.id }).then(function (result) {
      // Read result of the Cloud Function.
      console.table(result);
      return toggle(null);
    });
  }

  let disabled = !value[0]?.data().req_id;

  return (
    <div className="empty" id="verifyNumber">
      <div className="panel-close">
        <FontAwesomeIcon onClick={() => toggle(false)} icon={faTimes} size="2x" />
      </div>
      <div className="panel-header">
        <div className="panel-title h5">Verification Code</div>
      </div>
      <div className="panel-body">
        <input
          className="form-input"
          type="text"
          id="verifyCode"
          placeholder="Verification Code"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
      </div>
      <div className="panel-footer">
        <button className="btn btn-primary" disabled={disabled} onClick={_handleSubmit}>Verify Phone Number</button>
      </div>
    </div>
  )
};

export default VerifyNumber;