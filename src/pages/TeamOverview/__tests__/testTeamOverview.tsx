import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as API from '../../../api';
import TeamOverview from '..';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            teamName: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

const teamOverview = {
    id: '1',
    name: 'team name',
    teamLeadId: '2',
    teamMemberIds: ['3', '4', '5'],
};

const userData = {
    id: '2',
    firstName: 'first',
    lastName: 'last',
    displayName: 'userData',
    location: '',
    avatar: '',
};

describe('TeamOverview', () => {
    beforeEach(() => {
        jest.spyOn(API, 'getTeamOverview').mockImplementation(() => Promise.resolve(teamOverview));
        jest.spyOn(API, 'getUserData').mockImplementation(() => Promise.resolve(userData));
    });
    
    afterAll(() => {
        jest.resetAllMocks();
    });

    it('should render team overview users', async () => {
        render(<TeamOverview />);
        
        expect(await screen.findByText(/team lead/i)).toBeInTheDocument();
        expect(await screen.findByText('3 result(s)')).toBeInTheDocument();
        expect(screen.getAllByTestId('cardContainer-2')).toHaveLength(3);
    });

    it('should display no results', async () => {
        render(<TeamOverview />);
        
        userEvent.type(await screen.findByPlaceholderText(/search member by name/i), 'Jhon');
        expect(await screen.findByText(/no results found for “Jhon”/i)).toBeInTheDocument();
    });

    it('should display the error state', async () => {
        jest.spyOn(API, 'getTeamOverview').mockRejectedValueOnce('Ops');
        render(<TeamOverview />);       
        expect(await screen.findByText('Oops! Something wrong happened')).toBeInTheDocument();
    });
});
