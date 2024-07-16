import React, { useState, useEffect, useRef } from 'react';

const FileModal = ({ documents, currentIndex, onClose }) => {
    const [currentDocumentIndex, setCurrentDocumentIndex] = useState(currentIndex);
    const modalRef = useRef(null);

    useEffect(() => {
        // Focus the modal when it opens
        if (modalRef.current) {
            modalRef.current.focus();
        }

        // Clean up function if needed
        return () => {
            // Perform any cleanup actions here if necessary
        };
    }, [currentIndex, documents]);

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
        // Close modal on Escape key press
        if (event.key === 'Escape') {
            closeModal();
        }

        // Navigate documents on left and right arrow key press
        if (event.key === 'ArrowLeft') {
            handlePrev();
        }
        if (event.key === 'ArrowRight') {
            handleNext();
        }
    };

    // Replace with your logic to display the document (e.g., PDF viewer)
    const documentUrl = documents[currentDocumentIndex] && typeof documents[currentDocumentIndex] === 'object'
        ? URL.createObjectURL(documents[currentDocumentIndex])
        : '';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto p-10">
            {/* Overlay background */}
            <div className="modal-overlay fixed inset-0 bg-gray-500 opacity-50" onClick={closeModal}></div>

            {/* Modal container */}
            <div className="modal-container bg-white rounded-md max-w-4xl w-full h-full overflow-hidden relative">
                <button
                    className="modal-close absolute top-0 right-0 cursor-pointer text-white font-bold text-3xl m-4 z-50"
                    onClick={closeModal}
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <div className="document-viewer h-full w-full">
                    {/* Display the document content here */}
                    <embed
                        src={documentUrl}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                    />
                </div>

                {documents[currentDocumentIndex] && (
                    <div className="modal-caption text-center py-4 text-gray-400" id="document-modal-title">
                        {documents[currentDocumentIndex].name}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileModal;
