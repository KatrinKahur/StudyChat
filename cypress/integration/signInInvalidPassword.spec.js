it('testing that error msg is printed if password is not filled in',() => {
    cy.visit('/')
    cy.get('[data-testid="emailInput"]').type('cypress.test@studychat.se')
    cy.get('[data-testid="signInBtn"]').click()
    cy.get('[data-testid="message-container"]').contains('A password is required')
});