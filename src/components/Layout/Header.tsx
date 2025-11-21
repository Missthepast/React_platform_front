import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, HelpCircle } from 'lucide-react';
import './Header.scss';

const Header: React.FC = () => {
    const location = useLocation();

    // 简单映射路由到标题
    const getTitle = (): string => {
        if (location.pathname === '/sample-registration') return 'Sample Registration';
        if (location.pathname === '/case-setting') return 'Case Setting-up';
        if (location.pathname === '/design-system') return 'Design System Demo';
        return 'Dashboard';
    };

    return (
        <header className="header">
            <h2 className="header__title">{getTitle()}</h2>

            <div className="header__actions">
                <button className="header__icon-btn" aria-label="Help">
                    <HelpCircle size={20} />
                </button>
                <button className="header__icon-btn" aria-label="Notifications">
                    <Bell size={20} />
                </button>
                <div className="header__user">
                    <div className="header__avatar">DJ</div>
                    <span className="header__username">Dr. John Doe</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
