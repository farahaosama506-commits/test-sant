// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';           // ← نستورد الـ HomePage مباشرة
import FloatingIcons from './components/ui/FloatingIcons';
import Toast from './components/ui/Toast';
import Loader from './components/ui/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleAddToCart = (item) => {
    setToastMessage(`تم إضافة ${item.name} إلى السلة`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmitReservation = (data) => {
    setToastMessage('تم إرسال الحجز بنجاح');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Header />
      <main>
        {/* بدل AppRoutes → نحط HomePage مباشرة */}
        <HomePage 
          onAddToCart={handleAddToCart}
          onSubmitReservation={handleSubmitReservation}
        />
      </main>
      <Footer />
      <FloatingIcons />
      <Toast 
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </div>
  );
}

export default App;