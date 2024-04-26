import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ photos, onImageClick }) => {
  return (
    <ul className={css.imgGalleryList}>
      {photos !== null &&
        Array.isArray(photos) &&
        photos.map((photo) => {
          return (
            <li
              key={photo.id}
              className={css.imgGalleryItem}
              onClick={() => onImageClick(photo.urls.regular)}
            >
              <ImageCard photo={photo} onClick={onImageClick} />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
