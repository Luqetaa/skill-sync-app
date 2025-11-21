import React, { useEffect } from 'react';

const Toast = ({ message, isVisible, type = 'success' }) => {
  const baseClasses = "toast-content";
  const typeClasses = type === 'success' 
    ? 'toast-success' 
    : 'toast-info';

  return (
    <div className={`toast-container ${isVisible ? 'visible' : ''}`}>
      <div className={`${baseClasses} ${typeClasses}`}>
        {message}
      </div>
    </div>
  );
};

export default Toast;