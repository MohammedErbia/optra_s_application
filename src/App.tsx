import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/Home';
import AnimatedCursor from './components/AnimatedCursor';

const App: React.FC = () => {
  return (
    <>
      <AnimatedCursor />
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    </>
  );
};

export default App; 