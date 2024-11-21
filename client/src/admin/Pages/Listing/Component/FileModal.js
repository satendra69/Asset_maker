import React, { useState, useEffect, useRef } from 'react';
import httpCommon from "../../../../http-common";

const FileModal = ({ documents = [], currentIndex, isStored, onClose, modalPdfUrl }) => {
    const [pdfLoaded, setPdfLoaded] = useState(true);
    const modalRef = useRef(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.focus();
        }
    }, []);

    const closeModal = () => {
        onClose();
    };

    const currentDocument = documents[currentIndex];
    const documentUrl = isStored && currentDocument
        ? httpCommon.defaults.baseURL + currentDocument.attachment.replace(/\\/g, '/')
        : modalPdfUrl.replace(/\\/g, '/');

    // Handle PDF load error
    const handleObjectError = () => {
        setPdfLoaded(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-10 overflow-auto">
            <div className="fixed inset-0 transition-all duration-300 bg-gray-800 opacity-75 modal-overlay" onClick={closeModal}></div>
            <div
                className="relative w-full h-full max-w-4xl transition-transform duration-300 ease-in-out transform bg-white rounded-md shadow-lg modal-container"
                tabIndex={-1}
                ref={modalRef}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') closeModal();
                }}
            >
                <button
                    className="absolute z-50 text-3xl font-bold text-red-500 transition-colors duration-200 cursor-pointer top-3 right-2 modal-close hover:text-red-700"
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
                            className="rounded-md"
                        >
                            <div className="flex items-center justify-center w-full h-full">
                                <p>Your browser does not support PDFs. <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Download the PDF</a>.</p>
                            </div>
                        </object>
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <p className="text-xl text-gray-700">Sorry, we couldn't load the PDF. <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Download the PDF</a>.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileModal;
