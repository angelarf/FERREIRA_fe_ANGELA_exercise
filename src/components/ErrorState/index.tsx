import React from 'react';
import EmptyState from 'components/EmptyState';
import ErroIcon from './ErrorIcon';

const ErrorState = () => {
  return <EmptyState
      Icon={ErroIcon}
      title="Oops! Something wrong happened"
      text="Try again later"
  />;
};

export default ErrorState;