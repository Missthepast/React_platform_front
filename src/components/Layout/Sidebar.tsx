import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FlaskConical,
    Settings,
    BarChart2,
    FileText,
    Shield,
    Users
} from 'lucide-react';
import './Sidebar.scss';

interface MenuItem {
    name: string;
    path: string;
    icon: React.ReactNode;
}

const Sidebar: React.FC = () => {
    const menuItems: MenuItem[] = [
        { name: 'Test Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Sample Registration', path: '/sample-registration', icon: <FlaskConical size={20} /> },
        { name: 'Case Setting-up', path: '/case-setting', icon: <Settings size={20} /> },
        { name: 'Data Analyzer', path: '/analyzer', icon: <BarChart2 size={20} /> },
        { name: 'Test Management', path: '/test-mgmt', icon: <FileText size={20} /> },
        { name: 'Access Control', path: '/access', icon: <Shield size={20} /> },
        { name: 'Account Management', path: '/account', icon: <Users size={20} /> },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <FlaskConical />
                <span>GVAP R1.0</span>
            </div>

            <nav className="sidebar__nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
                        }
                    >
                        <span className="sidebar__nav-icon">{item.icon}</span>
                        <span className="sidebar__nav-text">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
