import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PaymentSummary from './pages/PaymentSummary';
import RedirectPage from './pages/RedirectPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment-summary" element={<PaymentSummary />} />
        <Route path="/processing" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;