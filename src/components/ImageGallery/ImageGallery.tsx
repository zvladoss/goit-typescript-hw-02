import { FC } from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import { UnsplashImage } from "../../types";

interface Props {
  images: UnsplashImage[];
  openModal: (image: UnsplashImage) => void;
}

const ImageGallery: FC<Props> = ({ images, openModal }) => {
  return (
    <ul className={s.gallery}>
      {images.map((image) => (
        <li key={image.id} className={s.galleryItem}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
