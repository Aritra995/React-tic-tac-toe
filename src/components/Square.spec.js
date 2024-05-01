import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Square from './Square';

describe('Square', () => {
    //AAA 
    /*
    Arrange
    Act
    Assert
    */

    describe('Square Component', () => {
        afterEach( () => {
            jest.clearAllMocks();
        } );


        it('should render X when value passed is X', () => {
            const value = 'X';
            const { getByTestId } = render(<Square value={value} />);
            const squareButton = getByTestId('squareButton');

            expect(squareButton).toBeInTheDocument();
            expect(squareButton).toHaveTextContent(value);
        });

        it('should call onSquareClick function when square component is clicked', () => {
            const onSquareClick = jest.fn();
            const { getByTestId } = render(<Square onSquareClick={onSquareClick} />);
            const squareButton = getByTestId('squareButton');

            userEvent.click(squareButton);
            expect(onSquareClick).toHaveBeenCalledTimes(1);
        });
        
    });
});
