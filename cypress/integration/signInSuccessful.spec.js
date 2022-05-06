it('test successful sign in', ()=> {
    cy.visit('/')
    cy.contains('Welcome to StudyChat!')
        .should('be.visible')
    cy.contains('Sign in')
        .should('be.visible')
    cy.contains("Click here to create one!").
    should('be.visible')
    cy.get('[data-testid="emailInput"]').type('cypress.test@studychat.se')
    cy.get('[data-testid="passwordInput"]').type('CypressTestingPassword').blur()
    cy.get('[data-testid="signInBtn"]').click()
    cy.contains('Main').should('be.visible')
})