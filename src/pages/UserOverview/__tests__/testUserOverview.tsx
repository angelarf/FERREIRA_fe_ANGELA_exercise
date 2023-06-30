import * as React from 'react';
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as API from '../../../api';
import UserOverview from '../index';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'John',
            lastName: 'Doe',
            displayName: 'johnDoe',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('UserOverview', () => {
   it('should render the user info', async () => {
        render(<UserOverview />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('johnDoe')).toBeInTheDocument();
        expect(screen.getByText('location')).toBeInTheDocument();
    });
});
