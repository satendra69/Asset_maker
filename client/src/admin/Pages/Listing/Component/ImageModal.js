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
        modalRef.current?.focus();
        return () => {
            images.forEach(image => {
                if (typeof image === 'object' && image.attachment) {
                    URL.revokeObjectURL(image);
                }
            });
        };
    }, [images]);

    useEffect(() => {
        if (zoomLevel === 1) setTranslate({ x: 0, y: 0 });
    }, [zoomLevel]);

    const closeModal = () => onClose();

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        resetZoom();
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        resetZoom();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
    };

    const getImageUrl = (image) => {
        if (image instanceof File) return URL.createObjectURL(image);
        if (typeof image === 'object' && image.attachment) {
            return `${httpCommon.defaults.baseURL}${image.attachment}`;
        }
        return '';
    };

    const imageUrl = getImageUrl(images[currentImageIndex]);

    const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 10));
    const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 1));

    const resetZoom = () => {
        setZoomLevel(1);
        setTranslate({ x: 0, y: 0 });
    };

    const handleWheel = (e) => {
        e.preventDefault();
        e.deltaY < 0 ? zoomIn() : zoomOut();
    };

    const startDragging = (e) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
        }
    };

    const stopDragging = () => setIsDragging(false);

    const handleDragging = (e) => {
        if (isDragging && zoomLevel > 1) {
            const newTranslate = {
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            };
            setTranslate(newTranslate);
        }
    };

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            modalRef.current.requestFullscreen?.().catch(console.error);
        } else {
            document.exitFullscreen?.().catch(console.error);
        }
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            role="dialog"
            aria-modal="true"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            ref={modalRef}
        >
            <div
                className={`relative bg-white rounded-lg shadow-lg max-w-7xl w-full ${isFullScreen ? 'h-screen' : ''}`}
            >
                {/* Close Button */}
                <button
                    className="absolute z-50 p-2 text-white bg-red-600 bg-opacity-75 rounded-full top-4 right-4 hover:bg-opacity-90"
                    onClick={closeModal}
                    aria-label="Close Modal"
                >
                    <FiX className="text-xl" />
                </button>

                {/* Full-Screen Toggle */}
                <button
                    className="absolute z-50 p-2 text-white bg-black bg-opacity-75 rounded-full top-4 left-4 hover:bg-opacity-90"
                    onClick={toggleFullScreen}
                    aria-label="Toggle Full Screen"
                >
                    {isFullScreen ? <FiMinimize2 className="text-xl" /> : <FiMaximize2 className="text-xl" />}
                </button>

                {/* Image Display */}
                <div
                    className="relative flex items-center justify-center w-full h-full"
                    onMouseDown={startDragging}
                    onMouseMove={handleDragging}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                    onWheel={handleWheel}
                >
                    <img
                        src={imageUrl}
                        alt={`Image ${currentImageIndex + 1}`}
                        className="transition-transform duration-300"
                        style={{
                            transform: `scale(${zoomLevel}) translate(${translate.x}px, ${translate.y}px)`,
                            cursor: zoomLevel > 1 ? 'grab' : 'auto',
                            maxHeight: '90vh',
                            maxWidth: '90vw',
                        }}
                        ref={imageRef}
                        onDragStart={(e) => e.preventDefault()}
                    />
                </div>

                {/* Navigation Buttons */}
                <button className="absolute z-50 transform -translate-y-1/2 left-4 top-1/2" onClick={handlePrev}>
                    <FiChevronLeft className="text-2xl text-white" />
                </button>
                <button className="absolute z-50 transform -translate-y-1/2 right-4 top-1/2" onClick={handleNext}>
                    <FiChevronRight className="text-2xl text-white" />
                </button>

                {/* Zoom Controls */}
                <div className="absolute z-50 flex space-x-2 bottom-4 left-4">
                    <button className="p-2 text-white bg-gray-800 rounded-full" onClick={zoomOut}>
                        <FiZoomOut />
                    </button>
                    <button className="p-2 text-white bg-gray-800 rounded-full" onClick={zoomIn}>
                        <FiZoomIn />
                    </button>
                </div>

                {/* Caption */}
                {images[currentImageIndex]?.name && (
                    <div className="absolute bottom-0 z-50 w-full py-2 text-center text-white bg-black bg-opacity-50">
                        {images[currentImageIndex].name}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageModal;
