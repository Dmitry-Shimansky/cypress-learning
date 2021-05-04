/// <reference types=Cypress />

describe('Check Apple site', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('title').as('title');
        cy.get('ul.ac-gn-list > li:nth-child(2)').as('macButton');
        cy.get('ul.ac-gn-list > li:nth-child(4)').as('iPhoneButton');
        cy.get('#ac-gn-link-search').as('searchButton');

    });

    it('Contains the correct title', function () {
        cy.get('@title').invoke('text').should('equal', 'Apple');
    });

    it('New imac 24 is present', function () {
        cy.get('@macButton').click();
        cy.get('#compare-gallery-desktop-trigger').as('desktopButton');
        cy.get('@desktopButton').click();
        cy.get('div[class="imac24 device"]').as('iMac24Object');
        cy.get('@iMac24Object').should('have.class', 'imac24 device').screenshot();
    });

    it('iPhone test', function () {
        cy.get('@iPhoneButton').click();
        cy.get('ul.chapternav-items > li:nth-child(1) span.chapternav-label').as('iPhone12Pro');
        cy.get('@iPhone12Pro').then($iPhone12Pro => {
            expect($iPhone12Pro.text()).to.equal('iPhone 12 Pro')
        }).debug();
    });

    it('Check finder', function () {
        cy.get('@searchButton')
            .type('Writing this text for clear it after finishing', {delay: 100});
        cy.get('#ac-gn-searchform-input').should('have.value', 'Writing this text for clear it after finishing')
            .clear().should('have.value', '');
    });
})
