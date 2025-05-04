import { FC } from "react";
import s from "./ImageCard.module.css";
import { UnsplashImage } from "../../types";

interface Props {
  image: UnsplashImage;
  openModal: (image: UnsplashImage) => void;
}

const ImageCard: FC<Props> = ({ image, openModal }) => {
  const { urls, alt_description } = image;

  return (
    <div className={s.imageCard} onClick={() => openModal(image)}>
      <img src={urls.small} alt={alt_description || "Image from Unsplash"} />
    </div>
  );
};

export default ImageCard;
