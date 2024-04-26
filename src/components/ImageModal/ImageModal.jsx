import Modal from "react-modal";
import { useEffect } from "react";

import { RiCloseLine } from "react-icons/ri";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
  },
};

const ImageModal = ({ imageUrl, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  return (
    <Modal
      isOpen={!!imageUrl}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <button className={css.closeButton} onClick={closeModal}>
        <RiCloseLine size="40" />
      </button>
      <div>
        <img src={imageUrl} alt="modal" />
      </div>
    </Modal>
  );
};

export default ImageModal;
