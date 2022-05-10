it('testing that error is printed when no credentials entered', ()=>{
    cy.visit('/')
    cy.get('[data-testid="signInBtn"]').click()
    cy.get('[data-testid="message-container"]').contains('Please fill in the credentials')
})