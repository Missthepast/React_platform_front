import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import UnderDevelopment from './UnderDevelopment';

describe('UnderDevelopment Component', () => {
    it('should render with title', () => {
        render(
            <MemoryRouter>
                <UnderDevelopment title="Test Module" />
            </MemoryRouter>
        );

        expect(screen.getByText('Test Module Module')).toBeInTheDocument();
        expect(screen.getByText('This module is under development')).toBeInTheDocument();
    });

    it('should display correct styling', () => {
        const { container } = render(
            <MemoryRouter>
                <UnderDevelopment title="Dashboard" />
            </MemoryRouter>
        );

        const card = container.querySelector('.card');
        expect(card).toBeInTheDocument();
    });
});
