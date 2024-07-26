import React, { useState, useEffect, useRef } from 'react';
import httpCommon from "../../../../http-common";

const FileModal = ({ documents, currentIndex, isStored, onClose, modalPdfUrl }) => {
    const [currentDocumentIndex, setCurrentDocumentIndex] = useState(currentIndex);
    const modalRef = useRef(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.focus();
        }
        setCurrentDocumentIndex(currentIndex);
    }, [currentIndex]);

    const closeModal = () => {
        onClose();
    };

    const handlePrev = () => {
        setCurrentDocumentIndex(prevIndex => (prevIndex === 0 ? documents.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentDocumentIndex(prevIndex => (prevIndex === documents.length - 1 ? 0 : prevIndex + 1));
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

    const documentUrl = isStored
        ? httpCommon.defaults.baseURL + documents[currentDocumentIndex].attachment
        : modalPdfUrl;

    // const documentUrl = isStored
    // ? documents[currentDocumentIndex].attachment
    // : URL.createObjectURL(documents[currentDocumentIndex]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto p-10">
            <div className="modal-overlay fixed inset-0 bg-gray-500 opacity-50" onClick={closeModal}></div>
            <div
                className="modal-container bg-white rounded-md max-w-4xl w-full h-full overflow-hidden relative"
                tabIndex={-1}
                ref={modalRef}
                onKeyDown={handleKeyDown}
            >
                <button
                    className="modal-close absolute top-0 right-0 cursor-pointer text-white font-bold text-3xl m-4 z-50"
                    onClick={closeModal}
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <div className="document-viewer h-full w-full">
                    <iframe
                        src={documentUrl}
                        width="100%"
                        height="100%"
                        title="PDF Viewer"
                        frameBorder="0"
                    ></iframe>
                </div>

                {documents[currentDocumentIndex] && (
                    <div className="modal-caption text-center py-4 text-gray-400" id="document-modal-title">
                        {documents[currentDocumentIndex].name || documents[currentDocumentIndex].file_name}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileModal;
