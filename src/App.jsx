import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import './styles/main.scss';

// Lazy load page components for better performance
const SampleRegistration = lazy(() => import('./modules/SampleRegistration/SampleRegistration'));
const UnderDevelopment = lazy(() => import('./pages/UnderDevelopment'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    color: '#00897B',
    fontSize: '16px',
    fontWeight: 500
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <Router>
      <div className="layout-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="page-container">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Navigate to="/sample-registration" replace />} />
                <Route path="/sample-registration" element={<SampleRegistration />} />
                <Route path="/case-setting" element={<UnderDevelopment title="Case Setting-up" />} />
                <Route path="/dashboard" element={<UnderDevelopment title="Test Dashboard" />} />
                <Route path="/analyzer" element={<UnderDevelopment title="Data Analyzer" />} />
                <Route path="/test-mgmt" element={<UnderDevelopment title="Test Management" />} />
                <Route path="/access" element={<UnderDevelopment title="Access Control" />} />
                <Route path="/account" element={<UnderDevelopment title="Account Management" />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;