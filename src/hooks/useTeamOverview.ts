import {useState, useEffect} from 'react';
import {IUserData} from 'types';
import {getTeamOverview, getUserData} from '../api';

const filterMemberByName = (teams: IUserData[], memberName: string) => {
  return teams?.filter(({firstName, lastName}) => {
    const name = `${firstName} ${lastName}`;
    const lowerCaseName = name.toLocaleLowerCase();
    const filterLowerCase = memberName.toLocaleLowerCase();
    return lowerCaseName?.includes(filterLowerCase);
  });
};

const useTeamOverview = ({teamId, teamMemberFilter = ''}: { teamId: string, teamMemberFilter?: string }) => {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [teamName, setTeamName] = useState<string>();
  const [teamLead, setTeamLead] = useState<IUserData>();
  const [teamMembers, setTeamMembers] = useState<IUserData[]>();

  const getMemberInfo = async (userIds: string[]) => {
    const userData = await Promise.all(
      userIds.map(async (id) => getUserData(id))
    );
    return userData;
  };

  const getTeamInfo = async () => {
    try {
      const {name, teamLeadId, teamMemberIds} = await getTeamOverview(teamId);
      setTeamName(name);
      const teamLeadInfo = await getUserData(teamLeadId);
      setTeamLead(teamLeadInfo);
      const members = await getMemberInfo(teamMemberIds);
      setTeamMembers(members);
      setIsLoading(false);
    } catch (e) {
      setError(e?.message || 'Oops, something wrong happened');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTeamInfo();
  }, []);

  const members = teamMemberFilter
    ?
    filterMemberByName(teamMembers, teamMemberFilter)
    :
    teamMembers;

  return {
    teamName,
    teamMembers: members,
    teamLead,
    isLoading,
    error,
  };
};

export default useTeamOverview;