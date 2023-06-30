import * as React from 'react';
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as API from '../../api';
import Teams from '../Teams';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('Teams', () => {
    beforeEach(() => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]);
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    it('should render spinner while loading', async () => {
        render(<Teams />);
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'));
    });

    it('should render teams list', async () => {
        render(<Teams />);

        expect(await screen.findByText('Team1')).toBeInTheDocument();
        expect(screen.getByText('Team2')).toBeInTheDocument();
    });

    it('should render the error state', async () => {
        jest.spyOn(API, 'getTeams').mockRejectedValueOnce('Ops');
        render(<Teams />);
        expect(await screen.findByText('Oops! Something wrong happened')).toBeInTheDocument();
    });

    it('should filter the list when user searchs for something', async () => {
        render(<Teams />);
        userEvent.type(await screen.findByPlaceholderText(/search team by name/i), 'Team1');
        expect(await screen.findByText('Team1')).toBeInTheDocument();
        expect(await screen.findByText('1 result(s)')).toBeInTheDocument();
        expect(screen.queryByText('Team2')).toBeNull();
    });
   
    it('should render the no results state', async () => {
        render(<Teams />);
        userEvent.type(await screen.findByPlaceholderText(/search team by name/i), 'Team 43');
        expect(await screen.findByText(/no results found for “team 43”/i)).toBeInTheDocument();
    });

});
