import React, { useState, useEffect, useRef } from 'react';
import { FiZoomIn, FiZoomOut, FiChevronLeft, FiChevronRight, FiX, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import httpCommon from "../../../../http-common";

const ImageModal = ({ images, currentIndex, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isFullScreen, setIsFullScreen] = useState(false);
    const modalRef = useRef(null);
    const imageRef = useRef(null);

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

    useEffect(() => {
        // Reset the position when zoom level is set back to 1 (original zoom)
        if (zoomLevel === 1) {
            setTranslate({ x: 0, y: 0 });
        }
    }, [zoomLevel]);

    const closeModal = () => {
        onClose();
    };

    const handlePrev = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        resetZoom();
    };

    const handleNext = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        resetZoom();
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
        if (image instanceof File) {
            return URL.createObjectURL(image);
        }
        if (typeof image === 'object' && image.attachment) {
            return httpCommon.defaults.baseURL + image.attachment;
        }
        return '';
    };

    const imageUrl = getImageUrl(images[currentImageIndex]);

    const zoomIn = () => {
        setZoomLevel(prevZoom => Math.min(prevZoom + 0.3, 10));
    };

    const zoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 0.3, 1));
    };

    const resetZoom = () => {
        setZoomLevel(1);
        setTranslate({ x: 0, y: 0 });  // Reset the image position to center
    };

    const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    };

    const startDragging = (e) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - translate.x,
                y: e.clientY - translate.y
            });
        }
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    const handleDragging = (e) => {
        if (isDragging && zoomLevel > 1) {
            const newTranslate = {
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            };
            setTranslate(newTranslate);
        }
    };

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            modalRef.current.requestFullscreen().catch(console.error);
        } else {
            document.exitFullscreen().catch(console.error);
        }
        setIsFullScreen(!isFullScreen);
    };

    const handleOverlayClick = (e) => {
        if (e.target === modalRef.current) {
            closeModal();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-modal-title"
            onKeyDown={handleKeyDown}
            onClick={handleOverlayClick}
            tabIndex={-1}
            ref={modalRef}
        >
            <div
                className={`relative mx-4 overflow-hidden bg-white rounded-lg shadow-lg modal-container max-w-7xl sm:max-w-3xl md:mx-auto ${isFullScreen ? 'w-full h-full' : ''
                    }`}
            >
                <button
                    className="absolute top-0 right-0 z-50 p-2 m-4 text-2xl text-white bg-black rounded-full hover:bg-opacity-75"
                    onClick={closeModal}
                    aria-label="Close modal"
                >
                    <FiX />
                </button>
                <button
                    className="absolute top-0 left-0 z-50 p-2 m-4 text-2xl text-white bg-black rounded-full hover:bg-opacity-75"
                    onClick={toggleFullScreen}
                    aria-label="Toggle full screen"
                >
                    {isFullScreen ? <FiMinimize2 /> : <FiMaximize2 />}
                </button>

                <div
                    className={`relative flex items-center justify-center p-4 bg-gray-800 ${isFullScreen ? 'w-full h-full' : ''
                        }`}
                    onMouseDown={startDragging}
                    onMouseMove={handleDragging}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                    onWheel={handleWheel}
                >
                    <div className="slide active">
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt={`${currentImageIndex + 1}`}
                                className="object-contain transition-transform duration-300"
                                style={{
                                    transform: `scale(${zoomLevel}) translate(${translate.x}px, ${translate.y}px)`,
                                    maxHeight: isFullScreen ? '100vh' : '80vh',
                                    maxWidth: isFullScreen ? '100vw' : '100%',
                                    cursor: zoomLevel > 1 ? 'grab' : 'auto',
                                }}
                                ref={imageRef}
                                onDragStart={(e) => e.preventDefault()}
                            />
                        )}
                    </div>

                    <button
                        className="absolute z-50 p-3 text-2xl text-white transform -translate-y-1/2 bg-black bg-opacity-75 rounded-full shadow-lg top-1/2 left-4 hover:bg-opacity-90"
                        onClick={handlePrev}
                        aria-label="Previous image"
                    >
                        <FiChevronLeft />
                    </button>
                    <button
                        className="absolute z-50 p-3 text-2xl text-white transform -translate-y-1/2 bg-black bg-opacity-75 rounded-full shadow-lg top-1/2 right-4 hover:bg-opacity-90"
                        onClick={handleNext}
                        aria-label="Next image"
                    >
                        <FiChevronRight />
                    </button>
                </div>

                <div className="absolute flex space-x-4 bottom-20 right-4">
                    <button
                        className="flex items-center justify-center w-12 h-12 text-xl text-white bg-black bg-opacity-75 rounded-full shadow-lg hover:bg-opacity-90"
                        onClick={zoomOut}
                        aria-label="Zoom out"
                    >
                        <FiZoomOut />
                    </button>
                    <button
                        className="flex items-center justify-center w-12 h-12 text-xl text-white bg-black bg-opacity-75 rounded-full shadow-lg hover:bg-opacity-90"
                        onClick={zoomIn}
                        aria-label="Zoom in"
                    >
                        <FiZoomIn />
                    </button>
                </div>

                {images[currentImageIndex] && (
                    <div className="absolute bottom-0 w-full py-4 text-center text-white bg-gray-900 bg-opacity-75 modal-caption" id="image-modal-title">
                        {images[currentImageIndex].name || images[currentImageIndex].file_name}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageModal;
