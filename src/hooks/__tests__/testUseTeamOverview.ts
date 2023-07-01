import {renderHook, waitFor} from '@testing-library/react';
import useTeamOverview from '../useTeamOverview';
import * as API from '../../api';

const teamOverviewMock = {
  id: '1',
  name: 'Team 1',
  teamLeadId: '2',
  teamMemberIds: ['2'],
};

const userDataMock = {
  id: '2',
  firstName: 'userData',
  lastName: 'userData',
  displayName: 'userData',
  location: '',
  avatar: '',
};

describe('useTeamOverview', () => {
  beforeEach(() => {
    jest.spyOn(API, 'getTeamOverview').mockImplementation(() => Promise.resolve(teamOverviewMock));
    jest.spyOn(API, 'getUserData').mockImplementation(() => Promise.resolve(userDataMock));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the loading state', async () => {
    const {result} = renderHook(() => useTeamOverview({teamId: '1'}));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(result.current.teamLead).toBeUndefined();
    expect(result.current.teamMembers).toBeUndefined();
    expect(result.current.teamName).toBeUndefined();
  });

  it('should return the team list when there`s no error', async () => {
    const {result} = renderHook(() => useTeamOverview({teamId: '1'}));
    // team lead
    jest.spyOn(API, 'getUserData').mockImplementationOnce(() => Promise.resolve({...userDataMock, firstName: 'teamLead'}));

    await waitFor(() => {
      expect(result.current.teamMembers).toEqual([userDataMock]);
    });
    expect(result.current.teamLead).toEqual({...userDataMock, firstName: 'teamLead'});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should return the the error', async () => {
    jest.spyOn(API, 'getUserData').mockRejectedValueOnce(new Error('Oops'));
    const {result} = renderHook(() => useTeamOverview({teamId: '1'}));
    await waitFor(() => {
      expect(result.current.error).toBe('Oops');
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.teamMembers).toBeUndefined();
  });
});