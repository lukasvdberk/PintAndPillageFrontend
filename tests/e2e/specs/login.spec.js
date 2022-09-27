beforeEach(() => {
    cy.visit('/')
})
describe('Login page', () => {
    it('should show the login page and login with valid credentials', () => {
        cy.visit('/login')
        cy.get('#username').type('test5@mail.com')
        cy.get('#password').type('Test123!')
        cy.get('#submit-button').click()

        cy.location('pathname').should('eq', '/')
    })
})