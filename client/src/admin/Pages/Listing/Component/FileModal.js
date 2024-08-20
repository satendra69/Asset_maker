import React, { useState, useEffect, useRef } from 'react';
import httpCommon from "../../../../http-common";

const FileModal = ({ documents = [], currentIndex, isStored, onClose, modalPdfUrl }) => {
    const [currentDocumentIndex, setCurrentDocumentIndex] = useState(currentIndex);
    const [pdfLoaded, setPdfLoaded] = useState(true);
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

    const currentDocument = documents[currentDocumentIndex];
    const documentUrl = isStored && currentDocument
        ? httpCommon.defaults.baseURL + currentDocument.attachment.replace(/\\/g, '/')
        : modalPdfUrl.replace(/\\/g, '/');

    // Function to handle PDF load errors
    const handleObjectError = () => {
        setPdfLoaded(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-10 overflow-auto">
            <div className="fixed inset-0 bg-gray-500 opacity-50 modal-overlay" onClick={closeModal}></div>
            <div
                className="relative w-full h-full max-w-4xl overflow-hidden bg-white rounded-md modal-container"
                tabIndex={-1}
                ref={modalRef}
                onKeyDown={handleKeyDown}
            >
                <button
                    className="absolute z-50 text-3xl font-bold text-white cursor-pointer top-2 right-28 modal-close"
                    onClick={closeModal}
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <div className="flex items-center justify-center w-full h-full document-viewer">
                    {pdfLoaded ? (
                        <object
                            data={`${documentUrl}#navpanes=0&scrollbar=0`}
                            type="application/pdf"
                            width="100%"
                            height="100%"
                            aria-label="PDF Viewer"
                            onError={handleObjectError}
                        >
                            <div className="flex items-center justify-center w-full h-full">
                                <p>Your browser does not support PDFs. <a href={documentUrl} target="_blank" rel="noopener noreferrer">Download the PDF</a>.</p>
                            </div>
                        </object>
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <p>Your browser does not support PDFs. <a href={documentUrl} target="_blank" rel="noopener noreferrer">Download the PDF</a>.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileModal;
