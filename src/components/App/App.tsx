import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

import { Toaster } from "react-hot-toast";
import { requestImagesByQuery } from "../../services/api";
import { useEffect, useState } from "react";

import css from "./App.module.css";
import { Photo } from "./App.types";

function App() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await requestImagesByQuery({
          query: searchQuery!,
          page: 1,
          perPage: perPage,
        });
        setPhotos(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDataByQuery();
  }, [searchQuery]);

  const onSetSearchQuery = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const perPage = 12;

  const loadMorePhotos = async () => {
    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const newData = await requestImagesByQuery({
        query: searchQuery!,
        page: nextPage,
        perPage,
      });
      setPhotos((prevPhotos: Photo[] | null) => {
        if (!prevPhotos) return newData;
        return [...prevPhotos, ...newData];
      });
      setPage(nextPage);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModalImageClick = (imageUrl: Photo) => {
    setModalImageUrl(imageUrl.urls.regular);
  };

  const closeModal = () => {
    setModalImageUrl(null);
  };

  return (
    <div className={css.container}>
      <SearchBar onSetSearchQuery={onSetSearchQuery} />
      <Toaster />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {photos && (
        <ImageGallery photos={photos} onImageClick={openModalImageClick} />
      )}
      {photos && photos.length > 0 && <LoadMoreBtn onClick={loadMorePhotos} />}
      {modalImageUrl && (
        <ImageModal imageUrl={modalImageUrl} closeModal={closeModal} />
      )}
    </div>
  );
}

export default App;
