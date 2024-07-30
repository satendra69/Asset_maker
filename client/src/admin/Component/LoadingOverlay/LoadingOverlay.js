import React from 'react';
import { Rings } from 'react-loader-spinner';
import './LoadingOverlay.css'; // Import the CSS file

const LoadingOverlay = () => (
    <div className="loading-overlay">
        <div className="loader-container">
            <Rings height="100" width="100" color="white" ariaLabel="loading" />
        </div>
    </div>
);

export default LoadingOverlay;
