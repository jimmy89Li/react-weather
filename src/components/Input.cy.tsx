import { Input } from './Input';

describe('<Input />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Input />);
  });

  it('should pass the type', () => {
    cy.mount(<Input type='test-type' />);
    cy.get('input').should('have.attr', 'type', 'test-type');
  });

  it('should pass the class', () => {
    cy.mount(<Input className='test-class' />);
    cy.get('input').should('have.class', 'test-class');
  });

  it('should pass the placeholder', () => {
    cy.mount(<Input placeholder='test-placeholder' />);
    cy.get('input').should('have.attr', 'placeholder', 'test-placeholder');
  });

  it('should pass the value', () => {
    cy.mount(<Input value='test-value' />);
    cy.get('input').should('have.value', 'test-value');
  });
});
