import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Modal from '../Modal/Modal';
import { nanoid } from 'nanoid';

const ImageGallery = ({ images }) => {
  const [modalImage, setModalImage] = useState('');

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const handleCloseModal = () => {
    setModalImage('');
  };

  return (
    <div>
      <ul className={css.gallery}>
        {images.map((image) => (
          <ImageGalleryItem key={nanoid()} image={image} onClick={handleImageClick} />
        ))}
      </ul>
      <Modal isOpen={modalImage !== ''} image={modalImage} onClose={handleCloseModal} />
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
