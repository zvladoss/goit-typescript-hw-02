import { FC, useEffect } from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";
import { UnsplashImage } from "../../types";

interface Props {
  data: UnsplashImage;
  onClose: () => void;
}

const ImageModal: FC<Props> = ({ data, onClose }) => {
  const { urls, alt_description, user, likes } = data;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={s.modal}
      overlayClassName={s.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <img
        src={urls.regular}
        alt={alt_description || "Large Image"}
        className={s.image}
      />
      <div className={s.infoOverlay}>
        <div className={s.modalInfo}>
          <p>Author: {user?.name || "Unknown"}</p>
          <p>Likes: {likes}</p>
        </div>
        <button className={s.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
