describe('Create and mark-unmark as favourite', function () {
    before(function () {
        cy.SignIn()
    });

    it('Create a post', function () {
        cy.get('ul.navbar-nav').children().contains('New Post').click()
        cy.hash().should('include', '#/editor')
        cy.get('form').within(($storm) => {
            cy.get('input').first().type('Test')
            cy.get('input').eq(1).type('Test 1')
            cy.get('textarea').last().type('Test 2')
            cy.contains('Publish Article').click()
        })
        cy.url().should('include', 'article')
    });

    it('Mark-unmark as favourite', function () {
        cy.get('ul.navbar-nav').children().contains('QAMs').click()
        cy.contains('My Articles').should('be.visible')
        cy.get('.ion-heart').first().click()
        cy.contains('Favorited Articles').click()
        cy.url().should('include','favorites')
        cy.get('.ion-heart').first().click()
        cy.reload()
        cy.contains('No articles are here... yet.').should('be.visible')
        cy.go('back')
    });
})
