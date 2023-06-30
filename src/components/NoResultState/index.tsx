import React from 'react';
import EmptyState from 'components/EmptyState';
import NoResultIcon from './NoResultIcon';

type NoResultBoxProps = {
  term: string;
}

const NoResultBox = ({term}: NoResultBoxProps) => {
  return <EmptyState
      Icon={NoResultIcon}
      title={`No results found for “${term}”`}
      text="Try shortening or rephrasing your search"
  />;
};

export default NoResultBox;