import React from "react";
function modal({ closeModal, children }) {
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        {children}
        <div className='footer'>
          <button
            className='btn btn-light btn-sm'
            onClick={() => closeModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default modal;
