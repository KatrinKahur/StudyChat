it('test successful sign in', ()=> {
    cy.visit('/')
    cy.contains('Welcome to StudyChat!')
        .should('be.visible')
    cy.contains('Sign in')
        .should('be.visible')
    cy.contains("Click here to create one!").
    should('be.visible')
    cy.get('[data-testid="emailInput"]').type('michael5@gmail.com')
    cy.get('[data-testid="passwordInput"]').type('123456').blur()
    cy.get('[data-testid="signInBtn"]').click()
    cy.contains('Main').should('be.visible')
    cy.contains('michael5').should('be.visible')

    cy.contains("contact list").should('be.visible').click()
    cy.contains("Student Ipsum").should('be.visible')
    cy.contains("hejdu Hej").should('be.visible')
    cy.contains("VincentContactList").should('be.visible')
})