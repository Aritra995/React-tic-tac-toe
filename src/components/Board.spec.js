import { render, screen, within } from '@testing-library/react';
import Board from './Board';
import userEvent from '@testing-library/user-event';

describe('Board Component Tests', () => {
    describe('Tic Tac Toe board', () => {

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return empty board at the start of the game', async () => {
            const onPlayHandler = jest.fn().mockName('onPlayHandler');
            const xIsNext = true;
            const squares = Array(9).fill(null);
            render(<Board xIsNext={xIsNext} squares={squares} onPlay={onPlayHandler} />);

            const rows = await screen.findAllByTestId('boardRow');

            for (const row of rows) {
                const squares = await within(row).findAllByTestId('squareButton');

                for (const square of squares) {
                    expect(square).toHaveTextContent('');
                }
            }
        });

        it('First click should be X', async () => {
            const onPlayMock = jest.fn();
            const squares = Array(9).fill(null);
            render(<Board xIsNext={true} squares={squares} onPlay={onPlayMock} />);

            const rows = await screen.findAllByTestId('boardRow');
            let moveCount = 0;
            for (const row of rows) {
                const squares = await within(row).findAllByTestId('squareButton');

                for (const square of squares) {
                    moveCount++;
                    userEvent.click(square);
                    if (moveCount === 1) {
                        expect(onPlayMock).toHaveBeenCalledWith(['X', null, null, null, null, null, null, null, null]);
                    }
                }

            }

        });

        it('should return the second click as O', async () => {
            const onPlayMock = jest.fn();
            const squares = Array(9).fill(null);
            render(<Board xIsNext={true} squares={squares} onPlay={onPlayMock} />);

            const rows = await screen.findAllByTestId('boardRow');

            let moveCount = 0;
            for (const row of rows) {
                const squares = await within(row).findAllByTestId('squareButton');

                for (const square of squares) {
                    moveCount++;
                    userEvent.click(square);
                    if (moveCount === 2) {
                        expect(onPlayMock).toHaveBeenCalledWith([null, 'X', null, null, null, null, null, null, null]);
                    }

                }
            }
        });

        it('should return the same value if the same square is clicked multiple times',
            async () => {
                const onPlayMock = jest.fn();
                const squares = Array(9).fill(null);
                render(<Board xIsNext={true} squares={squares} onPlay={onPlayMock} />);

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
                            expect(onPlayMock).toHaveBeenCalledWith(['X', null, null, null, null, null, null, null, null]);
                        }

                    }

                }

            });

        it('should give win for X with positions {0, 4, 8}', async () => {
            const squares = Array(9).fill(null);
            squares[0] = 'X';
            squares[4] = 'X';
            squares[8] = 'X';
            squares[3] = 'O';
            squares[6] = 'O';

            let xIsTrue = true;
            const onPlay = jest.fn((squares) => {
                xIsTrue = !xIsTrue;
            });

            const { getByTestId } = render(
                <Board xIsNext={xIsTrue} squares={squares} onPlay={onPlay} />
            );

            expect(getByTestId('statusText').textContent).toBe('Winner: X');

            const squaresButton = await screen.findAllByTestId('squareButton');

            userEvent.click(squaresButton[0]); // X
            userEvent.click(squaresButton[3]); // O
            userEvent.click(squaresButton[4]); // X
            userEvent.click(squaresButton[6]); // O
            userEvent.click(squaresButton[8]); // X

            expect(getByTestId('statusText').textContent).toBe('Winner: X');
        });

        it('should give win for O with positions {6, 4, 2}', async () => {
            const squares = Array(9).fill(null);
            squares[0] = 'X';
            squares[8] = 'X';
            squares[5] = 'X';
            squares[6] = 'O';
            squares[4] = 'O';
            squares[2] = 'O';

            let xIsTrue = true;
            const onPlay = jest.fn((squares) => {
                xIsTrue = !xIsTrue;
            });

            const { getByTestId } = render(
                <Board xIsNext={xIsTrue} squares={squares} onPlay={onPlay} />
            );

            expect(getByTestId('statusText').textContent).toBe('Winner: O');

            const squaresButton = await screen.findAllByTestId('squareButton');

            userEvent.click(squaresButton[0]); // X
            userEvent.click(squaresButton[6]); // O
            userEvent.click(squaresButton[8]); // X
            userEvent.click(squaresButton[4]); // O
            userEvent.click(squaresButton[5]); // X
            userEvent.click(squaresButton[2]); // O

            expect(getByTestId('statusText').textContent).toBe('Winner: O');
        });

    });
});

