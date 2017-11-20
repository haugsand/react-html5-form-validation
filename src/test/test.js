const e = {
    BAD_INPUT: 'Oppgi et gyldig tall.',
    FALLBACK_MESSAGE: 'Oppgi en gyldig verdi.',
    PATTERN_MISMATCH: 'Oppgi en verdi som passer det etterspurte mønsteret.',
    RANGE_OVERFLOW: max => `Oppgi et tall som er ${max} eller mindre.`,
    RANGE_UNDERFLOW: min => `Oppgi et tall som er ${min} eller større.`,
    STEP_MISMATCH: step => `Oppgi et tall som er delelig med ${step}.`,
    TOO_LONG: (maxLength, length) => `Verdien må ha maksimum ${maxLength} tegn. Den har nå ${length} tegn.`,
    TOO_SHORT: (minLength, length) => `Verdien må ha minst ${minLength} tegn. Den har nå ${length} tegn.`,
    TYPE_MISMATCH_EMAIL: 'Oppgi en gyldig e-postadresse.',
    TYPE_MISMATCH_URL: 'Oppgi en gyldig URL.',
    VALUE_MISSING: 'Dette feltet må fylles ut.'
};


describe('Example 1', () => {
    it('Go to example', () => {
        cy.visit('/')
        cy.get('#example1').scrollIntoView()
    })

    it('No error messages', () => {
        cy.get('#example1 [data-errorfor]').each($el => {
            cy.wrap($el).should('be.empty')
        })
    })

    it('Errors on submit', () => {
        cy.get('#example1 input[type="submit"]').click()
        cy.get('#fieldName').should('have.attr', 'aria-invalid', 'true')
        cy.get('[data-errorfor="fieldName"]').contains(e.VALUE_MISSING)
    })

    it('Validate on change', () => {
        cy.get('#fieldName').click()
            .type('s')
        cy.get('#fieldDescription').click()
        // TODO: validate-objectet er feil.
        
        //cy.get('[data-errorfor="fieldName"]').should('be.empty')
    })


})


describe('Example 2', () => {
    it('Go to example', () => {
        cy.visit('/')
        cy.get('#example2').scrollIntoView()
    })

    it('No error messages', () => {
        cy.get('#example2 [data-errorfor]').each($el => {
            cy.wrap($el).should('be.empty')
        })
    })

    it('Errors on submit', () => {
        cy.get('#example2 input[type="submit"]').click()
        cy.get('[data-errorfor="fieldTotalAmount"]').contains(e.VALUE_MISSING)
        cy.get('[data-errorfor="fieldMinAmount"]').contains(e.VALUE_MISSING)
        cy.get('[data-errorfor="fieldMaxAmount"]').contains(e.VALUE_MISSING)
    })

    it('Validate total amount', () => {
        cy.get('#fieldTotalAmount').type('3')
        cy.get('[data-errorfor="fieldTotalAmount"]').contains(e.RANGE_UNDERFLOW(5))
        cy.get('#fieldTotalAmount').type('0')
        cy.get('[data-errorfor="fieldTotalAmount"]').should('be.empty')
    })

    it('Validate min amount', () => {
        cy.get('#fieldMinAmount').type('2')
        cy.get('[data-errorfor="fieldMinAmount"]').contains(e.RANGE_UNDERFLOW(5))
        cy.get('#fieldMinAmount').type('0')
        cy.get('[data-errorfor="fieldMinAmount"]').should('be.empty')
        cy.get('#fieldMinAmount').type('0')
        cy.get('#example2 input[type="submit"]').click()
        cy.get('[data-errorfor="fieldMinAmount"]').contains(e.RANGE_OVERFLOW(30))
        cy.get('#fieldMinAmount').type('{backspace}')
        cy.get('[data-errorfor="fieldMinAmount"]').should('be.empty')
    })

    it('Validate max amount', () => {
        cy.get('#fieldMaxAmount').type('2')
        cy.get('[data-errorfor="fieldMaxAmount"]').contains(e.RANGE_UNDERFLOW(20))
        cy.get('#fieldMaxAmount').type('5')
        cy.get('[data-errorfor="fieldMaxAmount"]').should('be.empty')
        cy.get('#fieldMaxAmount').type('0')
        cy.get('#example2 input[type="submit"]').click()
        cy.get('[data-errorfor="fieldMaxAmount"]').contains(e.RANGE_OVERFLOW(30))
        cy.get('#fieldMaxAmount').type('{backspace}')
        cy.get('[data-errorfor="fieldMaxAmount"]').should('be.empty')
    })

})



