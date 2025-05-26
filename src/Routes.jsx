import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F0F13] text-white">
    <h1 className="text-5xl font-bold mb-4">404</h1>
    <p className="mb-6 text-lg">Sorry, the page you are looking for does not exist.</p>
    <button
      onClick={() => (window.location.href = '/')}
      className="bg-[#14B8A6] text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
    >
      Go Home
    </button>
  </div>
);

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;