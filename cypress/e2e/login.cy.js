/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });
  it('should display login page correctly', () => {
    cy.get('input[placeholder="email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Log In$/)
      .should('be.visible');
  });
  it('should display alert when email is empty', () => {
    cy.get('button')
      .contains(/^Log In$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });
  it('should display alert when password is empty', () => {
    cy.get('input[placeholder = "email"]').type('testuser@gmail.com');
    cy.get('button')
      .contains(/^Log In$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });
  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="email"]').type('testuser@gmail.com');
    cy.get('input[placeholder="Password"]').type('wrong_passsword');
    cy.get('button')
      .contains(/^Log In$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });
});
