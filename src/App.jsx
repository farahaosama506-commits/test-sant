// src/App.jsx
import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';  // استيراد HashRouter
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './AppRoutes';
import FloatingIcons from './components/ui/FloatingIcons';
import Toast from './components/ui/Toast';
import Loader from './components/ui/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // دوال التعامل مع الإضافات والحجوزات
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
    // محاكاة تحميل الصفحة
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <HashRouter>  {/* App كله ملفوف بـ HashRouter */}
      <div className="App">
        <Header />
        <main>
          <AppRoutes 
            onAddToCart={handleAddToCart}
            onSubmitReservation={handleSubmitReservation}
            showToast={showToast}
            toastMessage={toastMessage}
            setShowToast={setShowToast}
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
    </HashRouter>
  );
}

export default App;