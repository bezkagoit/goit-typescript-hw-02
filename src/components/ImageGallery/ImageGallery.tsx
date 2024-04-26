import { Photo } from "../App/App.types";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  photos: Photo[];
  onImageClick: (photo: Photo) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  photos,
  onImageClick,
}) => {
  return (
    <ul className={css.imgGalleryList}>
      {photos !== null &&
        Array.isArray(photos) &&
        photos.map((photo) => {
          return (
            <li
              key={photo.id}
              className={css.imgGalleryItem}
              onClick={() => onImageClick(photo)}
            >
              <ImageCard photo={photo} onClick={onImageClick} />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
