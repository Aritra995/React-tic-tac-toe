import { render, screen, within } from '@testing-library/react';
import Board from './Board';
import userEvent from '@testing-library/user-event';

describe('Board Component Tests', () => {
    describe('Tic Tac Toe board', () => {

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return empty board at the start of the game', async () => {

            render(<Board />);

            const rows = await screen.findAllByTestId('boardRow');

            for (const row of rows) {
                const squares = await within(row).findAllByTestId('squareButton');

                for (const square of squares) {
                    expect(square).toHaveTextContent('');
                }
            }
        });

        it('should return the first click as X', async () => {
            render(<Board />);

            const rows = await screen.findAllByTestId('boardRow');
            let moveCount = 0;
            for (const row of rows) {
                const squares = await within(row).findAllByTestId('squareButton');

                for (const square of squares) {
                    moveCount++;
                    userEvent.click(square);
                    if (moveCount === 1) {
                        expect(square).toHaveTextContent('X');
                    }
                }

            }
        });

        it('should return the second click as O', async () => {
            render(<Board />);

            const rows = await screen.findAllByTestId('boardRow');

            let moveCount = 0;
            for (const row of rows) {
                const squares = await within(row).findAllByTestId('squareButton');

                for (const square of squares) {
                    moveCount++;
                    userEvent.click(square);
                    if (moveCount === 2) {
                        expect(square).toHaveTextContent('O');
                    }

                }
            }
        });

        it('should return the same value if the same square is clicked multiple times',
            async () => {
                render(<Board />);
                const rows = await screen.findAllByTestId('boardRow');

                let moveCount = 0;
                for (const row of rows) {
                    const squares = await within(row).findAllByTestId('squareButton');

                    for (const square of squares) {
                        userEvent.click(square);
                        moveCount++;
                        userEvent.click(square);
                        if (moveCount === 1) {
                            userEvent.click(square);
                            expect(square).toHaveTextContent('X');
                        }

                    }

                }

            });
        it('should return X as winner of the game', async () => {
            const { getAllByTestId, getByTestId } = render(<Board />);

            const squares = getAllByTestId('squareButton');

            userEvent.click(squares[0]); // X
            userEvent.click(squares[3]); // O
            userEvent.click(squares[4]); // X
            userEvent.click(squares[6]); // O
            userEvent.click(squares[8]); // X

            expect(screen.getByTestId('statusText')).toHaveTextContent('Winner: X');
        });

        it('should return O as winner of the game', async () => {
            const { getAllByTestId, getByTestId } = render(<Board />);

            const squares = getAllByTestId('squareButton');

            userEvent.click(squares[0]); // X
            userEvent.click(squares[6]); // O
            userEvent.click(squares[8]); // X
            userEvent.click(squares[4]); // O
            userEvent.click(squares[5]); // X
            userEvent.click(squares[2]); // O

            expect(screen.getByTestId('statusText')).toHaveTextContent('Winner: O');
        });

    });
});
