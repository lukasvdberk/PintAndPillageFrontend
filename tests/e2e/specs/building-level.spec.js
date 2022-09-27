// 33 Een visuele verandering zien als een gebouw level 10 is geworden, zodat mijn dorp er mooier uit gaat zien.
describe('House level 10', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.get('#username').type('test7@mail.com')
        cy.get('#password').type('Test123!')
        cy.get('#submit-button').click()

        cy.location('pathname').should('eq', '/')
    })

    // logs into a account with 2 houses. One is level 10 the other is level 9
    it('should have house with image below level 10 because house is level 9', () => {
        const houseLevelBelowLevel10 = '/img/house.be5e1bc6.png'
        cy.get('.tileImgHouse').eq(0).should('have.attr', 'src', houseLevelBelowLevel10)
    })

    it('should have house with image greater than level 10 because house is level 11', () => {
        const houseLevel10Asset = '/img/house_10.05022f4d.png'
        cy.get('.tileImgHouse').eq(1).should('have.attr', 'src', houseLevel10Asset)
    })
})