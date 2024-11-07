import React from 'react';
import './report.css';

const reportPopup = ({ onClose }) => {
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <h1>Report this workout</h1>
                <p>Is this workout suspicious?</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default reportPopup;