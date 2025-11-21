import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import ErrorBoundary from './components/Shared/ErrorBoundary';
import './styles/design-system.scss';
import './styles/main.scss';

// Lazy load page components for better performance
const SampleRegistration = lazy(() => import('./modules/SampleRegistration'));
const UnderDevelopment = lazy(() => import('./pages/UnderDevelopment'));
const DesignSystemDemo = lazy(() => import('./pages/DesignSystemDemo'));

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      color: '#00897B',
      fontSize: '16px',
      fontWeight: 500,
    }}
  >
    Loading...
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="layout-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="page-container">
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Navigate to="/sample-registration" replace />} />
                  <Route path="/sample-registration" element={<SampleRegistration />} />
                  <Route path="/design-system" element={<DesignSystemDemo />} />
                  <Route
                    path="/case-setting"
                    element={<UnderDevelopment title="Case Setting-up" />}
                  />
                  <Route path="/dashboard" element={<UnderDevelopment title="Test Dashboard" />} />
                  <Route path="/analyzer" element={<UnderDevelopment title="Data Analyzer" />} />
                  <Route path="/test-mgmt" element={<UnderDevelopment title="Test Management" />} />
                  <Route path="/access" element={<UnderDevelopment title="Access Control" />} />
                  <Route
                    path="/account"
                    element={<UnderDevelopment title="Account Management" />}
                  />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
