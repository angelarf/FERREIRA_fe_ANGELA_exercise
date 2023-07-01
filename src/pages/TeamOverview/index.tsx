import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {IListItem, IUserData} from 'types';
import useTeamOverview from 'hooks/useTeamOverview';
import ErrorState from 'components/ErrorState';
import NoResultState from 'components/NoResultState';
import {useState} from 'react';
import SearchInput from 'components/SearchInput';
import Card from '../../components/Card';
import {Container} from '../../components/GlobalComponents';
import Header from '../../components/Header';
import List from '../../components/List';
import {SearchContainer} from './styles';

const mapMembers = (users: IUserData[]) => {
    return users?.map(u => {
        const columns = [
            {
                key: 'Name',
                value: `${u.firstName} ${u.lastName}`,
            },
            {
                key: 'Display Name',
                value: u.displayName,
            },
            {
                key: 'Location',
                value: u.location,
            },
        ];
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns,
            navigationProps: u,
        };
    }) as IListItem[];
};

const getTeamLeadColumns = (tlead: IUserData) => {
    return [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${tlead.firstName} ${tlead.lastName}`,
        },
        {
            key: 'Display Name',
            value: tlead.displayName,
        },
        {
            key: 'Location',
            value: tlead.location,
        },
    ];
};

const TeamOverview = () => {
    const {state: {name}} = useLocation();
    const {teamId} = useParams();
    const [teamMemberFilter, setTeamMemberFilter] = useState<string>();
    const {teamLead, teamMembers, isLoading, error} = useTeamOverview({teamId, teamMemberFilter});

    const noResultFound = teamMemberFilter && teamMembers?.length === 0;
    const membersMapped = mapMembers(teamMembers);

    if (error) {
        return <ErrorState />;
    }
 
    const renderContent = () => {
        if (noResultFound) {
            return <NoResultState term={teamMemberFilter} />;
        }

        return <List items={membersMapped} isLoading={isLoading} />;
    };

    return (
        <Container>
            <Header title={`Team ${name}`} />
            {teamLead && 
              <Card 
                  columns={getTeamLeadColumns(teamLead)}
                  url={`/user/${teamLead.id}`}
                  navigationProps={teamLead}
                  id="team-lead"
              />
            }
            {(!isLoading && !error) &&
                <SearchContainer>
                    <SearchInput setSearchTerm={setTeamMemberFilter} placeholder='Search member by name' />
                </SearchContainer>
            }
            {renderContent()}
        </Container>
    );
};

export default TeamOverview;
