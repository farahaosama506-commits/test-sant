import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  FaCoffee, 
  FaBars, 
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTripadvisor 
} from 'react-icons/fa';

const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const Header = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  
  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 50);
    }, 120); 

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const navItems = useMemo(
    () => [
      { id: 'home', label: 'Home', icon: '🏠' },
      { id: 'gallery', label: 'Gallery', icon: '🖼️' },
      { id: 'services', label: 'Services', icon: '⭐' },
      { id: 'menu', label: 'Menu', icon: '📋' },
      { id: 'contact', label: 'Contact', icon: '📞' },
      { id: 'reservation', label: 'Reservation', icon: '🕐' },
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      { icon: <FaFacebookF />, url: '#', label: 'Facebook' },
      { icon: <FaInstagram />, url: '#', label: 'Instagram' },
      { icon: <FaTwitter />, url: '#', label: 'Twitter' },
      { icon: <FaTripadvisor />, url: '#', label: 'TripAdvisor' },
    ],
    []
  );

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  }, []);

  const handleReservationClick = useCallback(() => {
    scrollToSection('contact');

    
  }, [scrollToSection]);

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <span className="contact-item">
                <i className="phone-icon">📞</i>
                +30 22860 12345
              </span>
              <span className="contact-item">
                <i className="clock-icon">🕐</i>
                Open: 7AM - 11PM
              </span>
            </div>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`main-nav ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="container">
          <div className="nav-content">
            {/* Logo */}
            <div
              className="logo-container"
              onClick={() => scrollToSection('home')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSection('home')}
            >
              <div className="logo-icon">
                <FaCoffee />
              </div>
              <div className="logo-text">
                <h1 className="logo-title">Santorini Café</h1>
                <p className="logo-subtitle">Mediterranean Experience</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <ul className="nav-menu">
              {navItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <button
                    onClick={() =>
                      item.id === 'reservation'
                        ? handleReservationClick()
                        : scrollToSection(item.id)
                    }
                    className={`nav-link ${item.id === 'reservation' ? 'reservation-btn' : ''}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
            <div className="mobile-menu-content">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    item.id === 'reservation'
                      ? handleReservationClick()
                      : scrollToSection(item.id)
                  }
                  className={`mobile-nav-link ${item.id === 'reservation' ? 'mobile-reservation-btn' : ''}`}
                >
                  <span className="mobile-nav-icon">{item.icon}</span>
                  <span className="mobile-nav-label">{item.label}</span>
                </button>
              ))}

              <div className="mobile-social">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="mobile-social-link"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});

export default Header;