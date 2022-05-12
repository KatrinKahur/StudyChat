it('testing that error is printed when no credentials entered', ()=>{
    cy.visit('/')
    cy.get('[data-testid="signInBtn"]').click()
    cy.on('window:alert', (msg) => {
        expect(msg).contain('Please fill in the credentials.');
    })
})