import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

        it( 'should take back to start of the game', async () =>  {
            render( <Game /> );

            const squares =  await screen.findAllByTestId('squareButton');
            
            userEvent.click(squares[0]); // X
            userEvent.click(squares[6]); // O
            userEvent.click(squares[8]); // X
            userEvent.click(squares[4]); // O

            const goToGameStartButton = await screen.findByTestId('gameReset#0');

            userEvent.click(goToGameStartButton);

            expect(squares[0]).toBeEmptyDOMElement();
            expect(squares[6]).toBeEmptyDOMElement();
            expect(squares[8]).toBeEmptyDOMElement();
            expect(squares[4]).toBeEmptyDOMElement();
            const boardSize = 9;
            for(var index = 0; index < boardSize;index++){
                expect(squares[index]).toBeEmptyDOMElement();
            }

        });

        it( 'should take back to the third move', async () => {
            render( <Game /> );

            const squares =  await screen.findAllByTestId('squareButton');
            
            userEvent.click(squares[0]); // X
            userEvent.click(squares[6]); // O
            userEvent.click(squares[8]); // X
            userEvent.click(squares[4]); // O

            const goToThirdMove = await screen.findByTestId('gameReset#3');

            userEvent.click(goToThirdMove);

            expect(squares[0]).toHaveTextContent('X');
            expect(squares[6]).toHaveTextContent('O');
            expect(squares[8]).toHaveTextContent('X');
            expect(squares[4]).toHaveTextContent('');
        });

        it( 'should remove all other buttons when go to game start is clicked', () => {
            render( <Game /> );

            const squares =  screen.queryAllByTestId('squareButton');
            
            userEvent.click(squares[0]); // X
            userEvent.click(squares[6]); // O
            userEvent.click(squares[8]); // X
            userEvent.click(squares[4]); // O

            const goToGameStartButton = screen.queryByTestId('gameReset#0');

            userEvent.click(goToGameStartButton);

            const goToFirstMove = screen.queryByTestId('gameReset#1');
            const goToSecondMove = screen.queryByTestId('gameReset#2');
            const goToThirdMove = screen.queryByTestId('gameReset#3');

            expect(goToFirstMove).not.toBeInTheDocument();
            expect(goToSecondMove).not.toBeInTheDocument();
            expect(goToThirdMove).not.toBeInTheDocument();

        });
    });
});
