import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import debouce from 'lodash/debounce';
import SearchInput from '..';
import userEvent from '@testing-library/user-event';

jest.mock('lodash/debounce');
debouce.mockImplementation(fn => fn);

describe('SearchInput', () => {
    it('should render the received placeholder', () => {
      render(<SearchInput setSearchTerm={jest.fn()} placeholder='Search Placeholder'/>);
      expect(screen.getByPlaceholderText('Search Placeholder')).toBeInTheDocument();
    });

    it('should execute the callback with the current value', async () => {
      const spy = jest.fn();
      render(<SearchInput  setSearchTerm={spy} />);
      userEvent.type(screen.getByPlaceholderText('Search ...'), 'myText');
      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith('myText');
      })
    });
});
