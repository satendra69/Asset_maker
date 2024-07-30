import React from 'react';
import './Loader.css'; // Make sure to create this CSS file

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <span>Loading...</span>
        </div>
    );
};

export default Loader;
