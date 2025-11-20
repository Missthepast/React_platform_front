import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import SampleRegistration from './modules/SampleRegistration/SampleRegistration';
import UnderDevelopment from './pages/UnderDevelopment';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="layout-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Navigate to="/sample-registration" replace />} />
              <Route path="/sample-registration" element={<SampleRegistration />} />

              {/* 未开发模块路由 */}
              <Route path="/case-setting" element={<UnderDevelopment title="Case Setting-up" />} />
              <Route path="/dashboard" element={<UnderDevelopment title="Test Dashboard" />} />
              <Route path="/analyzer" element={<UnderDevelopment title="Data Analyzer" />} />
              <Route path="/test-mgmt" element={<UnderDevelopment title="Test Management" />} />
              <Route path="/access" element={<UnderDevelopment title="Access Control" />} />
              <Route path="/account" element={<UnderDevelopment title="Account Management" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;