import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import Services from './components/sections/Services';
import Menu from './components/sections/Menu';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Toast from './components/ui/Toast';
import Loader from './components/ui/Loader';
import FloatingIcons from './components/ui/FloatingIcons';
import './styles/globals.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    phone: '',
    specialRequests: ''
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle reservation submission
  const handleReservationSubmit = (data) => {
    setReservationData(data);
    
    // Show success message
    setToastMessage(`✅ Reservation confirmed for ${data.guests} guests on ${data.date} at ${data.time}! We'll contact you soon.`);
    setShowToast(true);
    
    // Hide toast after 5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
    
    // Reset form after submission (handled in Contact component)
  };

  // Handle menu item added to cart
  const handleAddToCart = (item) => {
    setToastMessage(`🛒 Added ${item.name} to cart!`);
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Floating icons data
  const floatingIcons = [
    {
      id: 1,
      icon: '☕',
      style: { top: '15%', left: '5%', fontSize: '4rem', opacity: 0.1 },
      animation: 'float 6s ease-in-out infinite'
    },
    {
      id: 2,
      icon: '🚬',
      style: { top: '25%', right: '10%', fontSize: '3rem', opacity: 0.1 },
      animation: 'float 8s ease-in-out infinite 2s'
    },
    {
      id: 3,
      icon: '🍹',
      style: { bottom: '20%', left: '15%', fontSize: '3.5rem', opacity: 0.1 },
      animation: 'float 7s ease-in-out infinite 1s'
    },
    {
      id: 4,
      icon: '🍰',
      style: { top: '60%', right: '15%', fontSize: '4rem', opacity: 0.1 },
      animation: 'float 9s ease-in-out infinite 3s'
    }
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="app">
      {/* Floating Background Icons */}
      <FloatingIcons icons={floatingIcons} />
      
      {/* Header */}
      <Header scrollToSection={scrollToSection} />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero scrollToSection={scrollToSection} />
        
        {/* Gallery Section */}
        <Gallery />
        
        {/* Services Section */}
        <Services />
        
        {/* Menu Section */}
        <Menu onAddToCart={handleAddToCart} />
        
        {/* Contact Section */}
        <Contact 
          onSubmitReservation={handleReservationSubmit}
          initialData={reservationData}
        />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Toast Notifications */}
      <Toast 
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
      
      {/* Back to Top Button */}
      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
      
      {/* Quick Contact Widget */}
      <div className="quick-contact-widget">
        <a href="tel:+302286012345" className="quick-contact-btn phone" aria-label="Call us">
          📞
        </a>
        <a href="https://wa.me/302286012345" className="quick-contact-btn whatsapp" aria-label="WhatsApp">
          💬
        </a>
        <button 
          className="quick-contact-btn reservation"
          onClick={() => scrollToSection('contact')}
          aria-label="Make reservation"
        >
          🕐
        </button>
      </div>
    </div>
  );
}

export default App;