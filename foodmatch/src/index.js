import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './js/App';
import Login from './js/Login';
import Landing from './js/Landing';
import Liked from './js/Liked';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<App />} />
        <Route path="/liked" element={<Liked />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();