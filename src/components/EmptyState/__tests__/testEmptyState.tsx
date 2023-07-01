import React from 'react';
import {render, screen} from '@testing-library/react';
import EmptyState from '..';

const MyIcon = () => <div data-testid="myIcon"/>;

describe('EmptyState', () => {
    it('should render icon, title and text', () => {
        const title = 'Oops! Something wrong happened';
        const text = 'Try again later';
        render(
            <EmptyState
                Icon={MyIcon}
                title={title}
                text={text}
            />
        );

        expect(screen.getByTestId('myIcon')).toBeInTheDocument();
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(text)).toBeInTheDocument();
    });
});
