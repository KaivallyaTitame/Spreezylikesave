describe('Login', () => {
    beforeEach(() => {
        cy.viewport(360, 800)
      })

    it('login is working', () => {
        cy.visit('/');
    })
})