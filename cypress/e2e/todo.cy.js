describe('tests for ToDo app', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo')
  })

  it('displays two todo items by default', () => {
    cy.get('.todo-list li').should('have.length', 2)
  })

  it('displays two todo items with correct text', () => {
    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
  })

  it('checks off an item as completed', () => {
    const labelElement = cy.contains('Pay electric bill');

    labelElement.parent().find('input[type=checkbox]').check()
    labelElement.parents('li').should('have.class', 'completed')
  })

  it('adds new todo item with correct text and displays three items', () => {
    const newItem = 'Feed the cat';

    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    cy.get('.todo-list li').should('have.length', 3)
    cy.get('.todo-list li').last().should('have.text', newItem)
  })

  describe('with a checked task', () => {
    beforeEach(() => {
			cy.contains('Pay electric bill').parent().find('input[type=checkbox]').check()
		})

		it('filters for uncompleted tasks', () => {
			cy.contains('Active').click()
		
			cy.get('.todo-list li').should('have.length', 1).first().should('have.text', 'Walk the dog')
			cy.contains('Pay electric bill').should('not.exist')
		})

    it('filters for completed tasks', () => {
      cy.contains('Completed').click()

      cy.get('.todo-list li').should('have.length', 1).first().should('have.text', 'Pay electric bill')
      cy.contains('Walk the dog').should('not.exist')
    })

    it('deletes all completed tasks', () => {
      cy.contains('Clear completed').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill')
      cy.contains('Clear completed').should('not.exist')
    })
  })
})
