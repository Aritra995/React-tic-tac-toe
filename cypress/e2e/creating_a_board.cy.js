xdescribe('Creating the first square with X', () => {
    it('First square on the tic-tac-toe shows X', () => {
        cy.visit('http://localhost:3000');

        cy.contains('X');
    });
});

xdescribe('Creating a tic-tac-toe board', () => {
    it('Should have three rows with three squares containing X each', () => {
        cy.visit('http://localhost:3000');

        for (let i = 0; i < 3; i++) {
            cy.get('[data-testid="boardRow"]').find('.square').contains('X');
            cy.get('[data-testid="boardRow"]').should('have.length', 3);
        }
    });
});

xdescribe('Creating a tic-tac-toe board', () => {
    it('Should have three rows with three squares containing number corresponding to its position', () => {
        cy.visit('http://localhost:3000');

        for (let i = 0; i < 9; i++) {
            cy.get('[data-testid="boardRow"]').find('.square').contains(i+1);
            cy.get('[data-testid="boardRow"]').should('have.length', 3);
        }
    });

    it('Each square should contain number corresponding to its position', () => {
        cy.visit('http://localhost:3000');

        for (let i = 0; i < 9; i++) {
            cy.get('[data-testid="squareButton"]').contains(i+1);
        }
    });
});

describe('Clicking on board displays the move', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Initial state on the board should be empty', () => {
        cy.get('[data-testid="squareButton"]').each(($square) => {
            cy.wrap($square).should('have.text', '');
        });
    });

    it('Displays the first move on the board', () => {
        cy.get('[data-testid="squareButton"]').first().click();
        cy.get('[data-testid="squareButton"]').first().contains('X');
    });
});
