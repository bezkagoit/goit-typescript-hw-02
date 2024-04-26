import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import { Toaster } from "react-hot-toast";
import { requestImagesByQuery } from "./services/api";
import { useEffect, useState } from "react";

import css from "./App.module.css";

function App() {
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [modalImageUrl, setModalImageUrl] = useState(null);

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await requestImagesByQuery(searchQuery);
        setPhotos(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDataByQuery();
  }, [searchQuery]);

  const onSetSearchQuery = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const loadMorePhotos = async () => {
    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const newData = searchQuery
        ? await requestImagesByQuery(searchQuery, nextPage)
        : await requestImagesByQuery(nextPage);
      setPhotos((prevPhotos) => [...prevPhotos, ...newData]);
      setPage(nextPage);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModalImageClick = (imageUrl) => {
    setModalImageUrl(imageUrl);
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
      <ImageGallery photos={photos} onImageClick={openModalImageClick} />
      {photos && photos.length > 0 && <LoadMoreBtn onClick={loadMorePhotos} />}
      {modalImageUrl && (
        <ImageModal imageUrl={modalImageUrl} closeModal={closeModal} />
      )}
    </div>
  );
}

export default App;
