import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {HeaderContainer, NavigationHeader, BackButton, Title} from './styles';

interface Props {
    title: string;
    hideBackButton?: boolean;
}

const Header = ({title, hideBackButton}: Props) => {
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            <NavigationHeader>
                {!hideBackButton && (
                    <BackButton onClick={() => { navigate(-1);}}>
                        🔙
                    </BackButton>
                )}
                <Title>{title}</Title>
            </NavigationHeader>
        </HeaderContainer>
    );
};

export default Header;
