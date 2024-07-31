import React, { useState, useEffect, useRef } from 'react';
import httpCommon from "../../../../http-common";

const ImageModal = ({ images, currentIndex, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
    const modalRef = useRef(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.focus();
        }

        return () => {
            if (images[currentImageIndex] && typeof images[currentImageIndex] === 'object') {
                URL.revokeObjectURL(images[currentImageIndex]);
            }
        };
    }, [currentImageIndex, images]);

    const closeModal = () => {
        onClose();
    };

    const handlePrev = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
        if (event.key === 'ArrowLeft') {
            handlePrev();
        }
        if (event.key === 'ArrowRight') {
            handleNext();
        }
    };

    const getImageUrl = (image) => {
        console.log(typeof image, "typeof image", image);

        // Check if the image is a File object (for galleryImages)
        if (image instanceof File) {
            console.log(URL.createObjectURL(image), "File object");
            return URL.createObjectURL(image);
        }

        // Check if the image is an object with an attachment property (for storedGalleryImages)
        if (typeof image === 'object' && image.attachment) {
            console.log(httpCommon.defaults.baseURL + image.attachment, "Stored image object");
            return httpCommon.defaults.baseURL + image.attachment;
        }

        return '';
    };

    const imageUrl = getImageUrl(images[currentImageIndex]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-modal-title"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            ref={modalRef}
        >
            <div className="fixed inset-0 bg-gray-500 opacity-50 modal-overlay" onClick={closeModal}></div>
            <div className="relative mx-4 overflow-hidden bg-white rounded-lg modal-container max-w-7xl sm:max-w-3xl md:mx-auto">
                <button
                    className="absolute top-0 right-0 z-50 m-4 text-3xl font-bold text-white cursor-pointer modal-close"
                    onClick={closeModal}
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <div className="relative carousel">
                    <div className="slide active">
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt={`Uploaded Image ${currentImageIndex + 1}`}
                                className="object-cover w-full h-auto"
                            />
                        )}
                    </div>

                    <button
                        className="absolute z-50 p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full top-1/2 left-4"
                        onClick={handlePrev}
                        aria-label="Previous image"
                    >
                        &lt;
                    </button>
                    <button
                        className="absolute z-50 p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full top-1/2 right-4"
                        onClick={handleNext}
                        aria-label="Next image"
                    >
                        &gt;
                    </button>
                </div>

                {images[currentImageIndex] && (
                    <div className="py-4 text-center text-gray-400 modal-caption" id="image-modal-title">
                        {images[currentImageIndex].name || images[currentImageIndex].file_name}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageModal;
