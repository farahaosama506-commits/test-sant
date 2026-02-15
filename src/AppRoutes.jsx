// src/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import OwnerDashboard from './pages/OwnerDashboard';
import Toast from './components/ui/Toast';

const AppRoutes = ({ 
  onAddToCart, 
  onSubmitReservation, 
  showToast, 
  toastMessage, 
  setShowToast 
}) => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                onAddToCart={onAddToCart}
                onSubmitReservation={onSubmitReservation}
              />
            } 
          />
          <Route 
            path="/owner" 
            element={<OwnerDashboard />} 
          />
        </Routes>
      </main>
      <Footer />
      <Toast 
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </Router>
  );
};

export default AppRoutes;