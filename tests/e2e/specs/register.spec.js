
beforeEach(() => {
    cy.visit('/')
})
describe('Register page', () => {
    const randomEmail = () => `test${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}@gmail.com`
    it('should show the register page and register', () => {
        cy.visit('/register')
        cy.get('#username').type('test')
        cy.get('#email').type(randomEmail())
        cy.get('#password').type('Test!231')
        cy.get('#repeatPassword').type('Test!231')
        cy.get('#register-button').click()

        cy.contains('Account successfully created')
        cy.location('pathname').should('eq', '/login')
    })

    it('should not.eq register when the password is to short', () => {
        cy.visit('/register')
        cy.get('#username').type('test')
        cy.get('#email').type(randomEmail())
        cy.get('#password').type('Test!231')
        cy.get('#repeatPassword').type('test')
        cy.get('#register-button').click()

        cy.location('pathname').should('not.eq.eq', '/login')
    })

    it('should not.eq register when the password is empty', () => {
        cy.visit('/register')
        cy.get('#username').type('test')
        cy.get('#email').type(randomEmail())
        cy.get('#password').type('Test!231')
        cy.get('#repeatPassword').type('test')
        cy.get('#register-button').click()

        cy.location('pathname').should('not.eq', '/login')
    })

    it('should not.eq register when the email is empty', () => {
        cy.visit('/register')
        cy.get('#username').type('test')
        cy.get('#email').type(randomEmail())
        cy.get('#password').type('Test!231')
        cy.get('#repeatPassword').type('test')
        cy.get('#register-button').click()

        cy.location('pathname').should('not.eq', '/login')
    })

    it('should not.eq register when the password the username is empty', () => {
        cy.visit('/register')
        cy.get('#username').type('test')
        cy.get('#email').type(randomEmail())
        cy.get('#password').type('Test!231')
        cy.get('#repeatPassword').type('test')
        cy.get('#register-button').click()

        cy.location('pathname').should('not.eq', '/login')
    })
})