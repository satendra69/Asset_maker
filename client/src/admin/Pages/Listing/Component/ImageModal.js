import React, { useState, useEffect, useRef } from 'react';

const ImageModal = ({ images, currentIndex, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
    const modalRef = useRef(null);

    useEffect(() => {
        // Focus the modal when it opens
        if (modalRef.current) {
            modalRef.current.focus();
        }

        // Clean up function to release object URLs
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
        // Close modal on Escape key press
        if (event.key === 'Escape') {
            closeModal();
        }

        // Navigate images on left and right arrow key press
        if (event.key === 'ArrowLeft') {
            handlePrev();
        }
        if (event.key === 'ArrowRight') {
            handleNext();
        }
    };

    const imageUrl =
        images[currentImageIndex] && typeof images[currentImageIndex] === 'object'
            ? URL.createObjectURL(images[currentImageIndex])
            : '';

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-modal-title"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            ref={modalRef}
        >
            <div className="modal-overlay fixed inset-0 bg-gray-500 opacity-50" onClick={closeModal}></div>
            <div className="modal-container bg-white max-w-7xl sm:max-w-3xl mx-4 md:mx-auto rounded-lg overflow-hidden relative">
                <button
                    className="modal-close absolute top-0 right-0 cursor-pointer text-white font-bold text-3xl m-4 z-50"
                    onClick={closeModal}
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <div className="carousel relative">
                    <div className="slide active">
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt={`Uploaded Image ${currentImageIndex + 1}`}
                                className="w-full h-auto object-cover"
                            />
                        )}
                    </div>

                    {/* Navigation arrows */}
                    <button
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-50"
                        onClick={handlePrev}
                        aria-label="Previous image"
                    >
                        &lt;
                    </button>
                    <button
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-50"
                        onClick={handleNext}
                        aria-label="Next image"
                    >
                        &gt;
                    </button>
                </div>

                {images[currentImageIndex] && (
                    <div className="modal-caption text-center py-4 text-gray-400" id="image-modal-title">
                        {images[currentImageIndex].name}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageModal;
