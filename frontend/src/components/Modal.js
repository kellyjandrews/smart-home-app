import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const useModal = () => {
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(!visible);
  }

  return [visible, toggle];
};

const Modal = ({ visible, hide, title, children }) => visible ? ReactDOM.createPortal(
  <div className={`modal modal-sm active`}>
    <span href="#close" className="modal-overlay" aria-label="Close" onClick={hide} />
    <div className="modal-container">
      <div className="modal-header">
        <div className="modal-title h5">{title}</div>
      </div>
      <div className="modal-body">
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  </div>, document.body
) : null;


export { Modal, useModal };
