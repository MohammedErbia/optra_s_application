import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home';
import WhoWeArePage from './pages/WhoWeArePage';
import FaqPage from './pages/FaqPage';
import TeamPage from './pages/TeamPage';
import BlogPage from './pages/BlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import ApplyNowPage from './pages/ApplyNowPage';
import CareersPage from './pages/CareersPage';
import CareerDetailsPage from './pages/CareerDetailsPage';

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
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/who-we-are" element={<WhoWeArePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailsPage />} />
        <Route path="/apply" element={<ApplyNowPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:id" element={<CareerDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;