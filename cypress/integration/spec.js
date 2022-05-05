it('works', ()=> {
    cy.visit('/')
    cy.contains('Welcome to StudyChat!')
        .should('be.visible')
    cy.contains('Sign in')
        .should('be.visible')
})