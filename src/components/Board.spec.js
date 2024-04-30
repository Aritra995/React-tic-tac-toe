import { render, screen, within } from '@testing-library/react';
import Board from './Board';

describe('<Board />', () => {
    describe('Board with empty squares', () => {

        async function emptyBoard(){
            render(<Board />);
        }

        it('Board should be empty at the start of the game', async () => {
            await emptyBoard();
        
            const rows = await screen.findAllByTestId('boardRow');
        
            for (const row of rows) {
                const squares = await within(row).findAllByTestId('squareButton');
        
                for (const square of squares) {
                    expect(square).toHaveTextContent('');
                }
            }
        });        
        
    });
});
