describe('Make order', function() {

  before(function() {
    cy.visit('http://localhost:3001');
  })

  it('should be available on localhost:3001', function() {
    cy.visit('http://localhost:3001');
  });

  it('should add bun', function() {
    cy.get('h2').contains('Булки').parent().find('li').first().as('bun')
    cy.get('[class^=burger-constructor_container__]').first().as('burgerConstructor');
    cy.get('@bun').trigger('dragstart')
    cy.get('@burgerConstructor').trigger('drop');
    cy.get('@bun').find('span').first().should(($p) => {
      expect($p.text().trim()).equal("2");
    });
    cy.get('@burgerConstructor').find('[class^=burger-constructor_item__]').should('have.length', 2);
  })

  it('should add sauce', function() {
    cy.get('h2').contains('Соусы').parent().find('li').first().as('sauce')
    cy.get('[class^=burger-constructor_container__]').first().as('burgerConstructor');
    cy.get('[class^=burger-constructor_scrollable__]').as('burgerConstructorScrollable');
    cy.get('@sauce').trigger('dragstart')
    cy.get('@burgerConstructor').trigger('drop');
    cy.get('@sauce').find('span').first().should(($p) => {
      expect($p.text().trim()).equal("1");
    });
    cy.get('@burgerConstructor').find('[class^=burger-constructor_item__]').should('have.length', 2);
    cy.get('@burgerConstructorScrollable').find('[class^=burger-constructor-item_item__]').should('have.length', 1);
  })
  it('should add filling', function() {
    cy.get('h2').contains('Начинки').parent().find('li').first().as('filling')
    cy.get('[class^=burger-constructor_container__]').first().as('burgerConstructor');
    cy.get('[class^=burger-constructor_scrollable__]').as('burgerConstructorScrollable');
    cy.get('@filling').trigger('dragstart')
    cy.get('@burgerConstructor').trigger('drop');
    cy.get('@filling').find('span').first().should(($p) => {
      expect($p.text().trim()).equal("1");
    });

    cy.get('@burgerConstructor').find('[class^=burger-constructor_item__]').should('have.length', 2);
    cy.get('@burgerConstructorScrollable').find('[class^=burger-constructor-item_item__]').should('have.length', 2);
  })
}) 