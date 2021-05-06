/// <reference types=Cypress />

describe('Basic Unauthenticated Desktop Tests', function () {

    beforeEach(() => {
        // bootstraping external things
        cy.viewport(1280, 720)
        cy.visit('https://codedamn.com')
    })

    it('Login page looks good', function () {
        cy.contains('Sign In').click()
        cy.contains('Login with your credentials').should('exist')
        cy.contains('Go with Google').should('exist')
        cy.contains('Forgot password?').should('exist')
        cy.contains('Register an account').should('exist')
    });

    it('The login page links work', function () {
        // 1. Sign in page
        cy.contains('Sign In').click()

        //2. password reset page
        cy.contains('Forgot password?').click()

        //3. verify your page URL
        cy.url().should('include', '/password-reset')

        cy.url().then(value => {
            cy.log('The current real URL is: ', value)
        })

        console.log('Message in the browser console ', 111)

        //4. go back on the sign in page
        cy.go('back')

        cy.contains('Register an account').click()
        cy.url().should('include', '/register')
    });

    it('Login should display correct error', function () {
        cy.contains('Sign In').click()

        cy.contains('Unable to authorize').should('not.exist')

        cy.get('[data-testid="username"]').type('admin', {delay:200})
        cy.get('[data-testid="password"]').type('admin')
        cy.get('[data-testid="login"]').click()

        cy.contains('Unable to authorize').should('exist')
    });

    it('Login should work fine', function () {

        cy.contains('Sign In').click()

        cy.get('[data-testid="username"]').type('iosdev', {delay:200})
        cy.get('[data-testid="password"]').type('iosdev')
        cy.get('[data-testid="login"]').click()

        cy.url({timeout: 10 * 1000}).should('include', '/dashboard')
    });
});
