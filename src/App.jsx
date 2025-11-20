import React from 'react';
// 1. 修改这里：引入 HashRouter 并重命名为 Router
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import SampleRegistration from './modules/SampleRegistration/SampleRegistration';
import UnderDevelopment from './pages/UnderDevelopment';
import './styles/main.css';

function App() {
  return (
    // 2. 确保最外层包裹的是 Router (即 HashRouter)
    <Router>
      <div className="layout-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="page-container">
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
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;