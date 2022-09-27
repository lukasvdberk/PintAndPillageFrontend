beforeEach(() => {
    cy.visit('/')
})
describe('Building house', () => {
    before(() => {
        cy.visit('/login')
        cy.get('#username').type('test5@mail.com')
        cy.get('#password').type('Test123!')
        cy.get('#submit-button').click()

        cy.location('pathname').should('eq', '/')
    })
    it('should build a house on an empty tile', () => {
        cy.location('pathname').should('eq', '/')
        cy.get('.clickableTile').eq(15).click()
        cy.contains('.buildingInformationContainer', 'House').parent().contains("Build").click()
        cy.wait(500)
        cy.reload()
        cy.contains("Construction Times").should('not.exist');
    })
})