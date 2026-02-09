import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Gallery from './components/sections/Gallery';
import Services from './components/sections/Services';
import './styles/globals.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        <div className="loader-circle"></div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="highlight">Santorini Café</span>
          </h1>
          <p className="hero-subtitle">
            Where Mediterranean flavors meet breathtaking views
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Menu
            </button>
            <button 
              className="btn-secondary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book a Table
            </button>
          </div>
        </div>
        <div className="hero-wave"></div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Services Section */}
      <Services />

      {/* Temporary Placeholders */}
      <section id="menu" style={{
        padding: '6rem 2rem', 
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--white) 0%, var(--pale-blue) 100%)'
      }}>
        <h2 style={{
          fontSize: '3rem', 
          color: '#1e3a8a', 
          marginBottom: '2rem',
          background: 'linear-gradient(45deg, #1e3a8a, #0ea5e9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Menu Section
        </h2>
        <p style={{fontSize: '1.2rem', color: '#64748b'}}>Coming soon...</p>
      </section>

      <section id="contact" style={{
        padding: '6rem 2rem', 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #0ea5e9 100%)', 
        color: 'white'
      }}>
        <h2 style={{
          fontSize: '3rem', 
          marginBottom: '2rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          Contact Section
        </h2>
        <p style={{fontSize: '1.2rem', opacity: 0.9}}>Coming soon...</p>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#0f172a',
        color: 'white',
        textAlign: 'center',
        padding: '3rem 2rem',
        fontSize: '0.9rem'
      }}>
        <p>&copy; {new Date().getFullYear()} Santorini Café. All rights reserved.</p>
        <p style={{opacity: 0.7, marginTop: '0.5rem'}}>Crafted with ❤️ in Santorini</p>
      </footer>
    </div>
  );
}

export default App;