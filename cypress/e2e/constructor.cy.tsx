const bun = `[data-cy="643d69a5c3f7b9001cfa093c"]`;
const ingredient = `[data-cy="643d69a5c3f7b9001cfa0941"]`;
const modal = `[data-cy="modal"]`;
const modalClose = `[data-cy="modal-close"]`;
const orderNumber = `[data-cy="orderNumber"]`;


describe('проверка работы burger constructor', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', {
          fixture: 'ingredients.json'
        });
        cy.visit('/');
    });

    it('добавление ингредиентов в конструктор', () => {
        cy.get(bun).contains('Добавить').click().as('addBun');
        cy.get('.constructor-element').contains('Краторная булка N-200i').should('exist');

        cy.get(ingredient).contains('Добавить').click().as('addIngredient');
        cy.get('.constructor-element').contains('Биокотлета из марсианской Магнолии').should('exist');
    })

    it('открытье и закрытие модального окна', () => {
        cy.get(ingredient).click().as('openIngredient');
        cy.get(modalClose).click();
    })

    it('открытие и закрытие модального окна (нажатие на esc)', () => {
        cy.get(ingredient).click().as('openIngredient');
        cy.get('body').type('{esc}');
    })

    it('открытие и закрытие модального окна (клик по оверлею)', () => {
        cy.get(ingredient).click().as('openIngredient');
        cy.get('[data-cy="modal-overlay"]').click({force: true}); 
    })
});

describe('Order Creation', () => {
    beforeEach(() => {
        localStorage.setItem('refreshToken', 'fakeRefreshToken');
        cy.setCookie('accessToken', 'fakeAccessToken');
    
        cy.intercept('GET', '/api/ingredients', {
            fixture: 'ingredients.json'
          }).as('getIngredients');
        cy.intercept('GET', '/api/auth/user', {
            fixture: 'user.json'
        });
        cy.intercept('POST', '/api/orders', {
            fixture: 'order.json'
        });
        cy.visit('/');
    });

    afterEach(() => {
        localStorage.clear();
        cy.clearCookie('accessToken');
    });

    it('should create an order successfully', () => {
        cy.get(bun).contains('Добавить').click().as('addBun');
        cy.get(ingredient).contains('Добавить').click().as('addIngredient');

        cy.get('button').contains('Оформить заказ').click();
        cy.get(modal).should('be.visible');
        cy.get(orderNumber).should('contain.text', '51926');

        cy.get(modalClose).click();
        cy.get(modalClose).should('not.exist');
        
        cy.get('[data-cy="bun-top"]').should('not.contain');
        cy.get('[data-cy="ingredient"]').should('not.contain');
        cy.get('[data-cy="bun-bottom"]').should('not.contain');
    });
});