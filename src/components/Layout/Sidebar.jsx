import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FlaskConical, Settings, BarChart2, FileText, Shield, Users } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { name: 'Test Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Sample Registration', path: '/sample-registration', icon: <FlaskConical size={20} /> },
        { name: 'Case Setting-up', path: '/case-setting', icon: <Settings size={20} /> },
        { name: 'Data Analyzer', path: '/analyzer', icon: <BarChart2 size={20} /> },
        { name: 'Test Management', path: '/test-mgmt', icon: <FileText size={20} /> },
        { name: 'Access Control', path: '/access', icon: <Shield size={20} /> },
        { name: 'Account Management', path: '/account', icon: <Users size={20} /> },
    ];

    return (
        <div style={{
            width: 'var(--sidebar-width)',
            position: 'fixed',
            height: '100vh',
            background: 'white',
            borderRight: '1px solid var(--border-color)',
            zIndex: 100
        }}>
            <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '18px' }}>
                <FlaskConical /> GVAP R1.0
            </div>
            <nav style={{ marginTop: '20px' }}>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 24px',
                            textDecoration: 'none',
                            color: isActive ? 'white' : 'var(--text-dark)',
                            backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
                            borderLeft: isActive ? '4px solid #004D40' : '4px solid transparent'
                        })}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;