it('testing that error message is printed if the email is badly formatted',() => {
    cy.visit('/')
    cy.get('[data-testid="emailInput"]').type('MyEmail')
    cy.get('[data-testid="passwordInput"]').type('SomePassword').blur()
    cy.get('[data-testid="signInBtn"]').click()
    cy.on('window:alert', (msg) => {
        expect(msg).contain('Invalid email');
    })
});