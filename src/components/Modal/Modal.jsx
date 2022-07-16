import { useEffect } from "react";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

function Modal({ image, tags, onClose }) {

    useEffect(() => {
        const onEscKeydown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        }
        window.addEventListener('keydown', onEscKeydown);
        return () => {
            window.removeEventListener('keydown', onEscKeydown);
        }
    }, [onClose]);

    const onOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    return createPortal(
        <div className={css.overlay} onClick={onOverlayClick}>
            <div className={css.modal}>
                <img src={image} alt={tags} />
            </div>
        </div>, modalRoot
    );
}

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Modal;