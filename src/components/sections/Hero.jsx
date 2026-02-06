import React from 'react';

const Hero = () => {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #0ea5e9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Welcome to Santorini Café
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          Experience the taste of Mediterranean paradise
        </p>
        <button style={{
          padding: '1rem 2rem',
          background: 'white',
          color: '#1e3a8a',
          border: 'none',
          borderRadius: '50px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Explore Our Menu
        </button>
      </div>
    </section>
  );
};

export default Hero;