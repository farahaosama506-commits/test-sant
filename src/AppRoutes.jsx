// src/AppRoutes.jsx
//import React from 'react';
//import { Routes, Route } from 'react-router-dom';
//import HomePage from './pages/HomePage';
//import OwnerDashboard from './pages/OwnerDashboard';

const AppRoutes = ({ 
  onAddToCart, 
  onSubmitReservation, 
  showToast, 
  toastMessage, 
  setShowToast 
}) => {
  return (
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
      {/* أضف مسار للصفحات غير الموجودة - يرجع للرئيسية */}
      <Route 
        path="*" 
        element={<HomePage />} 
      />
    </Routes>
  );
};

export default AppRoutes;