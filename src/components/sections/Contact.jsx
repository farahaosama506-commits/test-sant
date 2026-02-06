import React, { useState } from 'react';

const Contact = ({ onReservationSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onReservationSubmit(formData);
    setFormData({ name: '', email: '', date: '', time: '', guests: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <section id="contact" style={{
      padding: '4rem 2rem',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #0ea5e9 100%)',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '2rem',
          borderRadius: '10px',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </div>
          <button type="submit" style={{
            width: '100%',
            padding: '1rem',
            background: 'white',
            color: '#1e3a8a',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Reserve Table
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;