import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Square from './Square';
import Game from './Game';

describe('Game component', () => {

    describe('Game Component', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });


        it('should return X as winner of the game', async () => {
            render(<Game />);

            const squares =  await screen.findAllByTestId('squareButton');

            userEvent.click(squares[0]); // X
            userEvent.click(squares[3]); // O
            userEvent.click(squares[4]); // X
            userEvent.click(squares[6]); // O
            userEvent.click(squares[8]); // X

            expect(screen.getByTestId('statusText')).toHaveTextContent('Winner: X');
        });

        it('should return O as winner of the game', async () => {
            render(<Game />);

            const squares =  await screen.findAllByTestId('squareButton');

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
