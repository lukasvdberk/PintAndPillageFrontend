beforeEach(() => {
    cy.visit('/')
})
describe('Login page', () => {
    const randomEmail = () => `test${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}@gmail.com`
    it('should show the register page and register', () => {
        cy.visit('/login')
        cy.get('#username').type('test5@mail.com')
        cy.get('#password').type('Test123!')
        cy.get('#submit-button').click()

        cy.location('pathname').should('eq', '/')
        cy.contains('Units in village')
    })
})