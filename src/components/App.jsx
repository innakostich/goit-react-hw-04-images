import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const handleCloseModal = () => {
    setModalImage('');
  };

  useEffect(() => {
    fetchImages();
  }, [searchQuery, page]);

  const fetchImages = () => {
    if (searchQuery === '') {
      return;
    }

    setIsLoading(true);

    axios
      .get('https://pixabay.com/api/', {
        params: {
          key: '34787029-9060cf1f0b6b2569d575ff8e0',
          per_page: 12,
          q: searchQuery,
          page: page,
        },
      })
      .then((response) => {
        const newImages = response.data.hits.map((image) => ({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const showLoadMoreButton = images.length > 0 && !isLoading;

  return (
    <div className={css.container}>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onItemClick={handleImageClick} />
      {isLoading && <Loader />}
      {showLoadMoreButton && <Button onClick={handleLoadMore} />}
      <Modal isOpen={modalImage !== ''} image={modalImage} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
