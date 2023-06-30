import * as React from 'react';
import {IListItem} from 'types';
import Card from '../Card';
import {Spinner} from '../Spinner';
import {Container, ResultsLabel} from './styles';

interface Props {
    items?: IListItem[];
    hasNavigation?: boolean;
    isLoading?: boolean;
}

const List = ({items, hasNavigation = true, isLoading}: Props) => {
    if (isLoading) {
        return <Spinner />;
    }
    const resultsLabel = `${items?.length || 0} team(s)`;
    return (
        <React.Fragment>
            <ResultsLabel>{resultsLabel}</ResultsLabel>
            <Container>
                {items?.map(({url, id, columns, navigationProps}) => {
                    return (
                        <Card
                            key={id}
                            id={id}
                            columns={columns}
                            navigationProps={navigationProps}
                            hasNavigation={hasNavigation}
                            url={url} 
                        />
                    );
                })}
            </Container>
        </React.Fragment>
    );
};

export default List;
