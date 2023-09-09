import React from "react";

function Modal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal-container flex flex-col justify-center items-center gap-5 bg-white p-12 rounded-lg">
        <h1 className="text-2xl text-center">
          Are you sure you want to delete this item?
        </h1>
        <div className="flex gap-5">
          <button className="btn_default" onClick={onClose}>
            Yes
          </button>
          <button className="btn_red" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
