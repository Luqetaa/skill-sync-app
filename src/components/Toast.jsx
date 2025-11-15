// Crie este novo arquivo em: src/components/Toast.jsx

import React, { useEffect } from 'react';

const Toast = ({ message, isVisible, type = 'success' }) => {
  // Define a cor baseada no 'tipo'
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