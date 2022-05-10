it('testing that error message is printed when user not found ', ()=> {
    cy.visit('/')
    cy.get('[data-testid="emailInput"]').type('TheNotExistingUser@studychat.se')
    cy.get('[data-testid="passwordInput"]').type('Password').blur()
    cy.get('[data-testid="signInBtn"]').click()
    cy.get('[data-testid="message-container"]').contains('User not found')
})