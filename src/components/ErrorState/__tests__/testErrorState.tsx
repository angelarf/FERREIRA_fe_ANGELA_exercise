import React from 'react';
import {render, screen} from '@testing-library/react';
import ErrorState from '..';

describe('ErrorState', () => {
    it('should render icon, title and text', () => {
        render(<ErrorState/>);

        expect(screen.getByTestId('errorIcon')).toBeInTheDocument();
        expect(screen.getByText('Oops! Something wrong happened')).toBeInTheDocument();
        expect(screen.getByText('Try again later')).toBeInTheDocument();
    });
});
