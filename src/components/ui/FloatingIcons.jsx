import React from 'react';
import './FloatingIcons.css';

const FloatingIcons = ({ icons }) => {
  // إذا كانت icons غير معرفة أو ليست مصفوفة، استخدم مصفوفة افتراضية
  const defaultIcons = [
    { id: 1, icon: '🍽️', style: { top: '10%', left: '5%' }, animation: 'float 3s ease-in-out infinite' },
    { id: 2, icon: '🍷', style: { top: '20%', right: '8%' }, animation: 'float 4s ease-in-out infinite 1s' },
    { id: 3, icon: '🌿', style: { bottom: '15%', left: '10%' }, animation: 'float 5s ease-in-out infinite 2s' },
    { id: 4, icon: '☕', style: { bottom: '25%', right: '12%' }, animation: 'float 6s ease-in-out infinite 3s' },
  ];

  // استخدم icons إذا كانت موجودة، وإلا استخدم defaultIcons
  const iconsToRender = icons || defaultIcons;

  // تأكد من أن iconsToRender هي مصفوفة قبل استخدام map
  if (!Array.isArray(iconsToRender) || iconsToRender.length === 0) {
    return null; // أو يمكنك إرجاع رسالة خطأ
  }

  return (
    <div className="floating-icons-container">
      {iconsToRender.map((icon) => (
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