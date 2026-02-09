import React from 'react';
import './FloatingIcons.css';

const FloatingIcons = ({ icons }) => {
  return (
    <div className="floating-icons-container">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="floating-icon"
          style={{
            ...icon.style,
            animation: icon.animation
          }}
        >
          {icon.icon}
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;