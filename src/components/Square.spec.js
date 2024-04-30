import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Square from './Square';

describe('<Square />', () => {
    describe('clicking the square button', () => {

        async function emptySquare(){
            render(<Square />);
        }
        async function clickSquare() {
            render(<Square />);

            await userEvent.click(
                screen.getByTestId('squareButton')
            );
        }

        it('initial state of square should be empty', async () => {
            await emptySquare();
            expect(screen.getByTestId('squareButton')).toHaveTextContent('');
        });

        it('on click should show X', async () => {
            await clickSquare();
            expect(screen.getByTestId('squareButton')).toHaveTextContent('X');
        });
    });
});
