import { Button } from './Button';

describe('<Button />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button />);
  });

  it('should pass the content', () => {
    cy.mount(<Button>Search</Button>);
    cy.get('button').should('have.text', 'Search');
  });

  it('should pass the classes', () => {
    cy.mount(<Button className='test-class' />);
    cy.get('button').should('have.class', 'test-class');
  });

  it('should be disabled', () => {
    cy.mount(<Button disabled={true} />);
    cy.get('button').should('be.disabled');
  });
});
