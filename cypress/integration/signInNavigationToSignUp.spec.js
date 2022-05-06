it('test successful sign in', ()=> {
    cy.visit('/')
    cy.get('[data-testid="signUpBtn"]').click()
    cy.contains('Sign-up').should('be.visible')
})