import {renderHook, waitFor} from '@testing-library/react';
import useTeams from '../useTeams';
import * as API from '../../api';

const defaultTeamsMock = [
  {
      id: '1',
      name: 'Team1',
  },
  {
      id: '2',
      name: 'Team2',
  },
];


describe('useTeams', () => {
  beforeEach(() => {
    jest.spyOn(API, 'getTeams').mockResolvedValue(defaultTeamsMock);
  });

  it('should return the loading state', async() => {  
      const {result} = renderHook(() => useTeams());
      expect(result.current.isLoading).toBe(true);
      expect(result.current.error).toBeUndefined();
      expect(result.current.teams).toEqual([]);
  });

  it('should return the team list when there`s no error', async () => {
    const {result} = renderHook(() => useTeams());
    await waitFor(() => {
      expect(result.current.teams).toEqual(defaultTeamsMock);
    });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    await waitFor(() => {
      expect(result.current.error).toBeUndefined();
    });

  });

  it('should return the the error', async () => {
    jest.spyOn(API, 'getTeams').mockRejectedValueOnce('Oops');
    const {result} = renderHook(() => useTeams());
    await waitFor(() => {
      expect(result.current.teams).toEqual([]);
    });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    await waitFor(() => {
      expect(result.current.error).toBe('Oops');
    });
  });
});