import { useState } from "react";
import PropTypes from 'prop-types';
import Modal from "components/Modal/Modal";
import css from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ image, thumbnail, tags }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <>
            <li className={css.imageGalleryItem} onClick={toggleModal} >
                <img
                    src={thumbnail}
                    alt={tags}
                    className={css.imageGalleryItem__image} />
            </li>
            {isModalOpen && <Modal
                image={image}
                tags={tags}
                onClose={toggleModal} />}
        </>
    );
}

ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired
}

export default ImageGalleryItem;