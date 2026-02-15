// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/sections/Hero';
import Gallery from '../components/sections/Gallery';
import Services from '../components/sections/Services';
import Menu from '../components/sections/Menu';
import Contact from '../components/sections/Contact';
import FloatingIcons from '../components/ui/FloatingIcons';

const HomePage = ({ onAddToCart, onSubmitReservation }) => {
  const floatingIcons = [
    { id: 1, icon: '☕', style: { top: '15%', left: '5%', fontSize: '4rem', opacity: 0.1 }, animation: 'float 6s ease-in-out infinite' },
    { id: 2, icon: '🚬', style: { top: '25%', right: '10%', fontSize: '3rem', opacity: 0.1 }, animation: 'float 8s ease-in-out infinite 2s' },
    { id: 3, icon: '🍹', style: { bottom: '20%', left: '15%', fontSize: '3.5rem', opacity: 0.1 }, animation: 'float 7s ease-in-out infinite 1s' },
    { id: 4, icon: '🍰', style: { top: '60%', right: '15%', fontSize: '4rem', opacity: 0.1 }, animation: 'float 9s ease-in-out infinite 3s' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <FloatingIcons icons={floatingIcons} />
      <Hero scrollToSection={scrollToSection} />
      <Gallery />
      <Services />
      <Menu onAddToCart={onAddToCart} />
      <Contact onSubmitReservation={onSubmitReservation} />
    </>
  );
};

export default HomePage;