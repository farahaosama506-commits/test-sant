import React from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaTripadvisor,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebookF />, url: '#', label: 'Facebook' },
    { icon: <FaInstagram />, url: '#', label: 'Instagram' },
    { icon: <FaTwitter />, url: '#', label: 'Twitter' },
    { icon: <FaTripadvisor />, url: '#', label: 'TripAdvisor' }
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: '123 Ocean View Drive, Santorini, Greece' },
    { icon: <FaPhone />, text: '+30 22860 12345' },
    { icon: <FaEnvelope />, text: 'info@santorinicafe.gr' },
    { icon: <FaClock />, text: 'Mon-Fri: 7AM - 11PM | Sat-Sun: 8AM - 12AM' }
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Services', href: '#services' },
    { label: 'Menu', href: '#menu' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section about">
            <h3 className="footer-title">Santorini Café</h3>
            <p className="footer-description">
              Experience the authentic taste of Mediterranean culture with breathtaking 
              views and exceptional service in the heart of Santorini.
            </p>
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

          {/* Contact Section */}
          <div className="footer-section contact">
            <h3 className="footer-title">Contact Info</h3>
            <div className="contact-info">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-item">
                  <span className="contact-icon">{info.icon}</span>
                  <span className="contact-text">{info.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section links">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section newsletter">
            <h3 className="footer-title">Newsletter</h3>
            <p>Subscribe for updates and special offers</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Santorini Café. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;