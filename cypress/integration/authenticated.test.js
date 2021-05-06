/// <reference types=Cypress />

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJ1c2VybmFtZSI6Imlvc2RldiIsIl9pZCI6IjViNzM2N2JiYzdjNDU1MTA5ZTFm" +
    "NzI4YyIsIm5hbWUiOiJpb3NkZXYiLCJpYXQiOjE2MjAyMTIxMTksImV4cCI6MTYy" +
    "MjgwNDExOX0.w2J14wrNWlroiy3mmOqMzoIIzeRNwAaOO43xlAlKbGQ"

describe('Basic Unauthenticated Desktop Tests', function () {

    before(() => {
        cy.then(() => {
            window.localStorage.setItem('__auth__token', token)
        })
    })

    beforeEach(() => {
        // bootstraping external things
        cy.viewport(1280, 720)
        cy.visit('https://codedamn.com')
    })

    it('Should load playground correctly', function () {
        cy.visit('https://codedamn.com/playground/html')

        cy.log('Checking for sidebar')
        cy.contains('Trying to connect').should('exist')

        cy.log('Checking bottom left button')
        cy.get('span.MuiButton-label').should('contain.text', 'Create Shareable Link')
        // cy.debug()
        cy.contains('Trying to establish connection').should('exist')

        cy.log('Playground initializing')
        cy.contains('Setting up the challenge', {timeout: 7 * 1000}).should('exist')
        cy.contains('Setting up the challenge', {timeout: 15 * 1000}).should('not.exist')
    });

    it('New file feature works', function () {
        cy.visit('https://codedamn.com/playground/html')

        cy.contains('Setting up the challenge', {timeout: 7 * 1000}).should('exist')
        cy.contains('Setting up the challenge', {timeout: 15 * 1000}).should('not.exist')

        const fileName = Math.random().toString().slice(0,3)

        cy.get('[data-testid=xterm]')
            .type('{ctrl}{c}')
            .type(`touch testscript.${fileName}.js{enter}`)

        cy.contains(`testscript.${fileName}.js`).should('exist')
    });

    it.only('Rename file feature works', function () {
        cy.visit('https://codedamn.com/playground/html')

        cy.contains('Setting up the challenge', {timeout: 7 * 1000}).should('exist')
        cy.contains('Setting up the challenge', {timeout: 15 * 1000}).should('not.exist')

        const fileName = Math.random().toString().slice(0,3)

        cy.get('[data-testid=xterm]')
            .type('{ctrl}{c}')
            .type(`touch testscript.${fileName}.js{enter}`)

        cy.contains(`testscript.${fileName}.js`).rightclick()
        cy.contains('Rename File').click()
        cy.get('[data-testid=renamefilefolder]').type(`new_.${fileName}.js`)
        cy.get('[data-testid=renamebtn]').click()
        cy.contains(`testscript.${fileName}.js`).should('not.exist')
        cy.contains(`new_.${fileName}.js`).should('exist')
    });
})
