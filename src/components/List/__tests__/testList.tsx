import React from 'react';
import {render, screen} from '@testing-library/react';
import List from '..';

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => jest.fn(),
}));



describe('List', () => {
    const defaultItems = [
        {
            id: '1',
            columns: [
                {
                    key: 'columnKey1',
                    value: 'columnValue1',
                },
            ],
        },
    ];

    it('should render spinner and not render items when it is loading', () => {
        render(<List isLoading items={defaultItems} />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        expect(screen.queryByTestId('cardContainer')).not.toBeInTheDocument();
    });

    it('should not render spinner and render items when it is not loading', () => {
        render(<List isLoading={false} items={defaultItems} />);

        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
    });

    it('should render multiple card when multiple items', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
            {
                id: '2',
                columns: [
                    {
                        key: 'columnKey2',
                        value: 'columnValue2',
                    },
                ],
            },
        ];
        render(<List isLoading={false} items={items} />);

        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-2')).toBeInTheDocument();
    });
});
