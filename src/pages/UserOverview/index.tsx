import * as React from 'react';
import {useLocation} from 'react-router-dom';
import Card from '../../components/Card';
import {Container} from '../../components/GlobalComponents';
import Header from '../../components/Header';

const UserOverview = () => {
    const location = useLocation();
    const {firstName, lastName, displayName, location: userLocation} = location.state;
    const userName = `${firstName} ${lastName}`;
    const columns = [
        {
            key: 'Name',
            value: userName,
        },
        {
            key: 'Display Name',
            value: displayName,
        },
        {
            key: 'Location',
            value: userLocation,
        },
    ];
    return (
        <Container>
            <Header title={`User ${userName}`} />
            <Card columns={columns} hasNavigation={false} navigationProps={location.state} />
        </Container>
    );
};

export default UserOverview;
