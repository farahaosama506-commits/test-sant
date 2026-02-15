import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';
import React from 'react';
import { HashRouter } from 'react-router-dom';  // استيراد HashRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>  {/* لف الـ App بـ HashRouter */}
      <App />
    </HashRouter>
  </React.StrictMode>
);