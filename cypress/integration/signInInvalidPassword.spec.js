it('testing that error msg is printed if password is not filled in',() => {
    cy.visit('/')
    cy.get('[data-testid="emailInput"]').type('cypress.test@studychat.se')
    cy.get('[data-testid="signInBtn"]').click()
    cy.on('window:alert', (msg) => {
        expect(msg).contain('A password is required.');
    })
});