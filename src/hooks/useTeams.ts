import {useState, useEffect} from 'react';
import {ITeam} from 'types';
import {getTeams as fetchTeams} from '../api';


const filterTeamsByName = (teams: ITeam[], teamName: string) => {
  return teams?.filter(({name}) => {
    const lowerCaseName = name.toLocaleLowerCase();
    const filterLowerCase = teamName.toLocaleLowerCase();
    return lowerCaseName?.includes(filterLowerCase);
  });
};

const useTeams = (teamNameFilter = '') => {
  const [error, setError] = useState<Error>();
  const [teamList, setTeamList] = useState<ITeam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTeams = async () => {
    try {
      const response = await fetchTeams();
      setTeamList(response);
      setIsLoading(false);
    } catch (e) {
      setError(e || new Error('Oops, something wrong happened'));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const teams = teamNameFilter ? filterTeamsByName(teamList, teamNameFilter) : teamList;

  return {
    teams,
    isLoading,
    error,
  };
};

export default useTeams;