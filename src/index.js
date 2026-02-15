// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  {/* مش محتاج تحط Router هنا لأنه موجود في App.jsx */}
  </React.StrictMode>
);