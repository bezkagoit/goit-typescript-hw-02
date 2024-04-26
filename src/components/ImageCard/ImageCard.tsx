import { Photo } from "../App/App.types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, onClick }) => {
  const handleClick = () => {
    onClick(photo);
  };

  return (
    <div>
      <img
        className={css.imgCard}
        src={photo.urls.small}
        alt={photo.alt_description}
        width={250}
        onClick={handleClick}
      />
      <div className={css.imgCardStats}>
        <p>
          Author:
          <br />
          <strong>{photo.user.name}</strong>
        </p>

        <p>
          Likes: <strong>{photo.likes}</strong>
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
