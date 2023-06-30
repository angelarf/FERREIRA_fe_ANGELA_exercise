import React, {useState} from 'react';
import {IListItem, ITeam as ITeamList} from 'types';
import SearchInput from 'components/SearchInput';
import NoResultState from 'components/NoResultState';
import ErrorState from 'components/ErrorState';
import Header from '../components/Header';
import List from '../components/List';
import useTeams from '../hooks/useTeams';
import {Container} from '../components/GlobalComponents';

const mappedTeams = (teams: ITeamList[]): IListItem[] => {
    return teams?.map(team => {
        const columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        };
    });
};

const Teams = () => {
    const [teamNameFilter, setTeamNameFilter] = useState<string>();
    const {teams, isLoading, error} = useTeams(teamNameFilter);

    const noResultFound = teamNameFilter && teams?.length === 0;

    const renderContent = () => {
        if (error) {
            return <ErrorState />;
        }

        if (noResultFound) {
            return <NoResultState term={teamNameFilter} />;
        }

        return <List items={mappedTeams(teams || [])} isLoading={isLoading} />;
    };


    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            {(!isLoading && !error) &&
                <SearchInput setSearchTerm={setTeamNameFilter} placeholder='Search team by name' />
            }
            {renderContent()}
        </Container>
    );
};

export default Teams;
