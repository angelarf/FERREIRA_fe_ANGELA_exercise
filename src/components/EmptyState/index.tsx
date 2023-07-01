import React from 'react';
import {Container, Title, Text} from './styles';

type EmptyStateProps = {
  title: string;
  text?: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const EmptyState = ({title, text, Icon}: EmptyStateProps) => {
  return <Container>
    <Icon width="14rem" height="14rem" />
    <Title>{title}</Title>
    <Text>{text}</Text>
  </Container>;
};

export default EmptyState;