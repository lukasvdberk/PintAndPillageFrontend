// 25 Vijandige dorpen op de wereldkaart aanvallen zodat ik resources van deze dorpen kan stelen.
describe('Attacking village', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.get('#username').type('test6@mail.com')
        cy.get('#password').type('Test123!')
        cy.get('#submit-button').click()

        cy.location('pathname').should('eq', '/')
        cy.contains('Units in village')
        cy.get('.mapButton').eq(0).click()
    })

    it('should not attack another village with not enough ships', () => {
        cy.get('.villageTile').eq(0).click()
        cy.get('.pillageButton').eq(0).click()
        cy.get('input[type=number]').eq(0).type(0)
        cy.get('.combatButton').eq(0).click()

        cy.contains("Not enough carrying capacity").should('exist');
    })

    it('should not attack another village with not enough spears', () => {
        cy.get('.villageTile').eq(0).click()
        cy.get('.pillageButton').eq(0).click()
        cy.get('input[type=number]').eq(0).type(1)
        cy.get('.combatButton').eq(0).click()
        cy.get('input[type=number]').eq(0).type(0)
        cy.get('.combatButton').eq(0).click()

        cy.contains("Please select some units").should('exist');
    })

    it('should not attack your own village', () => {
        cy.get('.villageTile').eq(1).click()
        cy.get('.pillageButton').eq(0).click()
        cy.get('input[type=number]').eq(0).type(1)
        cy.get('.combatButton').eq(0).click()
        cy.get('input[type=number]').eq(0).type(200)
        cy.get('.combatButton').eq(0).click()

        cy.contains("AxiosError: Request failed with status code 422").should('exist');
    })


    it('should attack another village with enough resources', () => {
        cy.get('.villageTile').eq(0).click()
        cy.get('.pillageButton').eq(0).click()
        cy.get('input[type=number]').eq(0).type(1)
        cy.get('.combatButton').eq(0).click()
        cy.get('input[type=number]').eq(0).type(50)
        cy.get('.combatButton').eq(0).click()
        cy.contains("Units Send!").should('exist');

        cy.visit('/')
        cy.wait(7000) // to plunder and to gather resources

        cy.contains(10250).should('exist');
    })
})