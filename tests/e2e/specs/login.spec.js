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

    it('should show the login page and not login with invalid credentials', () => {
        cy.visit('/login')
        cy.get('#username').type('test340@mail.com')
        cy.get('#password').type('Test123123412!')
        cy.get('#submit-button').click()

        cy.contains('Something went wrong')
        cy.location('pathname').should('eq', '/login')
        cy.location('pathname').should('not.eq', '/')
    })
})