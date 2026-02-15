// src/App.jsx
import React, { useState, useEffect } from 'react';
import AppRoutes from './AppRoutes';
import Loader from './components/ui/Loader';
import './styles/globals.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item) => {
    setToastMessage(`🛒 Added ${item.name} to cart!`);
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleReservationSubmit = (data) => {
    setToastMessage(`✅ Reservation confirmed for ${data.guests} guests at Table ${data.tableNumber}!`);
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AppRoutes
      onAddToCart={handleAddToCart}
      onSubmitReservation={handleReservationSubmit}
      showToast={showToast}
      toastMessage={toastMessage}
      setShowToast={setShowToast}
    />
  );
}

export default App;