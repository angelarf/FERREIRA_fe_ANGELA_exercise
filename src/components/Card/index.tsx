import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {ITeam, IUserData} from 'types';
import {Container} from './styles';

interface Props {
    id?: string;
    url?: string;
    columns: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    navigationProps?: IUserData | ITeam;
}

const Card = ({
    id,
    columns,
    url,
    hasNavigation = true,
    navigationProps = null,
}: Props): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={(e: Event) => {
                e.preventDefault();
                if (hasNavigation) {
                    navigate(url, {
                        state: navigationProps,
                    });
                }
            }}
        >
            {columns.map(({key, value}) => (
                <p key={key}>
                    <strong>{key}</strong> {value}
                </p>
            ))}
        </Container>
    );
};

export default Card;
