beforeEach(() => {
    cy.visit('/')
})
describe('Login page', () => {
    before(() => {
        cy.visit('/login')
        cy.get('#username').type('test5@mail.com')
        cy.get('#password').type('Test123!')
        cy.get('#submit-button').click()

        cy.location('pathname').should('eq', '/')
        cy.contains('Units in village')
    })
    it('should build a house on an empty tile', () => {
        cy.location('pathname').should('eq', '/')
        cy.contains('Units in village')

        cy.get('.clickableTile').eq(15).click()
        cy.contains('.buildingInformationContainer', 'House').parent().contains("Build").click()
        cy.wait(500)
        cy.contains("Construction Times").should('not.exist');
    })
})