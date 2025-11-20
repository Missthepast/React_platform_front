import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, HelpCircle, User } from 'lucide-react';

const Header = () => {
    const location = useLocation();

    // 简单映射路由到标题
    const getTitle = () => {
        if (location.pathname === '/sample-registration') return 'Sample Registration';
        if (location.pathname === '/case-setting') return 'Case Setting-up';
        return 'Dashboard';
    };

    return (
        <header style={{
            height: 'var(--header-height)',
            position: 'fixed',
            top: 0,
            left: 'var(--sidebar-width)',
            right: 0,
            background: 'white',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            zIndex: 99
        }}>
            <h2 style={{ fontSize: '20px', fontWeight: 500 }}>{getTitle()}</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <HelpCircle size={20} color="#666" />
                <Bell size={20} color="#666" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px' }}>DJ</div>
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>Dr. John Doe</span>
                </div>
            </div>
        </header>
    );
};

export default Header;