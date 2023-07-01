import React from 'react';
import {render, screen} from '@testing-library/react';
import EmptyState from '..';

describe('EmptyState', () => {
    it('should render icon, title and text', () => {
        render(<EmptyState term="team"/>);

        expect(screen.getByTestId('noResultIcon')).toBeInTheDocument();
        expect(screen.getByText('No results found for “team”')).toBeInTheDocument();
        expect(screen.getByText('Try shortening or rephrasing your search')).toBeInTheDocument();
    });
});
