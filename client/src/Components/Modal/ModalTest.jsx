import React, { useState } from "react";
import Modal from "react-modal";

const ModalTest = ({ modalIsOpen, setModalIsOpen, handleConfirm }) => {
  const customStyles = {
    content: {
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => {
        setModalIsOpen((cb) => !cb);
      }}
      contentLabel="Basic Yes/No Modal"
      style={customStyles}
    >
      <p>Bạn có chắc chắn muốn xóa không?</p>
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => {
            setModalIsOpen((cb) => !cb);
          }}
          style={{ marginRight: "10px" }}
        >
          Close
        </button>
        <button onClick={handleConfirm} style={{ backgroundColor: "#47acb8" }}>
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ModalTest;
