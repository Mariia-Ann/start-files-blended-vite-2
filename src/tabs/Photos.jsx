import Text from '../components/Text/Text';
import Form from '../components/Form/Form';
import Loader from '../components/Loader/Loader';
import { useState, useEffect } from 'react';
import { getPhotos } from '../apiService/photos.js';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery.jsx';
import Button from '../components/Button/Button.jsx';
import ImageModal from '../components/ImageModal/ImageModal.jsx';

const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page
        );
        if (!photos.length) {
          return setIsEmpty(true);
        }
        setImages(prevImages => [...prevImages, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));

        console.log(photos);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const getQuery = value => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(false);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (src, alt) => {
    setModalIsOpen(true);
    setModalSrc(src)
    setModalAlt(alt)
  }
  const closeModal = () => {
    setModalIsOpen(false);
    setModalSrc("")
    setModalAlt("")
  }
  return (
    <>
      <Form onSubmit={getQuery} />
      {!error && !isEmpty && !images.length && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {isLoading && <Loader />}
      {isEmpty && <Text textAlign="center">Sorry, we domt found images</Text>}
      {error && <Text textAlign="center">Oops! Something went wrong...</Text>}
      {images.length > 0 && <PhotosGallery images={images} openModal={openModal} />}

      {isVisible && images.length > 0 && <Button onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading' : 'Load more'}
        </Button>}
        <ImageModal modalIsOpen={modalIsOpen} closeModal={closeModal} src={modalSrc} alt={modalAlt} />
    </>
  );
};

export default Photos;
