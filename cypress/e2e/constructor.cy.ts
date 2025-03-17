import cypress from 'cypress';

const constructor = '[data-cy="burgerConstructor"]';
const modal = '[data-cy="modal"]';
const modalClose = '[data-cy="modal-close"]';
const modalCloseOverlay = '[data-cy="modal-close-overlay"]';
const orderButton = '[data-cy="order-button"]';
const orderNumber = '[data-cy="order-number"]';
const bun1 = '[data-cy="1"]';
const main = '[data-cy="2"]';
const souce = '[data-cy="3"]';
const bun2 = '[data-cy="4"]';

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'getAllIngredients'
  );
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
  // Установите токен аутентификации в localStorage перед загрузкой страницы
  window.localStorage.setItem('refreshToken', 'testRefreshToken');
  cy.setCookie('accessToken', 'testAccessToken');

  cy.visit('/');
  cy.viewport(1600, 1024);

  cy.get(constructor).as('constructor');

  cy.wait('@getAllIngredients');
  cy.wait('@getUser');
});

afterEach(() => {
  window.localStorage.clear();
  cy.clearCookies();
});

describe('Добавление булки и ингредиента', () => {
  it('Добавление булки', () => {
    // Проверяем добавление булки
    cy.clickChildButton(bun1);
    cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    // Проверяем замену булки
    cy.clickChildButton(bun2);
    cy.get('@constructor').should('not.contain', 'Краторная булка N-200i');
    cy.get('@constructor').should('contain', 'Флюоресцентная булка R2-D3');
  });
  it('Добавление ингредиентов', () => {
    // Проверяем добавление ингредиента 1
    cy.clickChildButton(main);
    cy.get('@constructor').should('contain', 'Биокотлета из марсианской Магнолии');
    cy.get('@constructor').should('not.contain', 'Соус Spicy-X');
    // Проверяем добавление ингредиента 2
    cy.clickChildButton(souce);
    cy.get('@constructor').should('contain', 'Биокотлета из марсианской Магнолии');
    cy.get('@constructor').should('contain', 'Соус Spicy-X');
  });

  describe('Тестируем модальное окно ингредиента', () => {
    it('Открытие модального окна', () => {
      cy.get(bun1).click();
      cy.get(modal).as('modal');
      cy.get('@modal').should('be.visible');
      cy.get('@modal').should('contain', 'Краторная булка N-200i');
    });
    it('Закрытие по клику на крестику', () => {
      cy.get(bun1).click();
      cy.get(modal).as('modal');
      cy.get('@modal').should('be.visible');
      cy.get(modalClose).click();
      cy.get('@modal').should('not.exist');
    });
    it('Закрытие по клику на оверлей', () => {
      cy.get(bun1).click();
      cy.get(modal).as('modal');
      cy.get('@modal').should('be.visible');
      cy.get(modalCloseOverlay).click({ force: true });
      cy.get('@modal').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('Создает заказ и проверяет, что конструктор пуст после закрытия модалки', () => {
      // Собираем бургер
      // добавляем булку
      cy.clickChildButton(bun1);
      // добавляем ингредиенты
      cy.clickChildButton(main);
      cy.clickChildButton(souce);
      cy.get('@constructor').should('contain', 'Краторная булка N-200i');
      cy.get('@constructor').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );
      cy.get('@constructor').should('contain', 'Соус Spicy-X');

      // Создаём моковые данные ответа на запрос создания заказа
      cy.intercept('POST', 'api/orders', { fixture: 'createOrder.json' }).as(
        'createOrder'
      );
      // Вызываем клик по кнопке «Оформить заказ».
      cy.get(orderButton).click();
      // Проверяем, что модальное окно открылось и номер заказа верный.
      cy.get(modal).as('modal');
      cy.get('@modal').should('be.visible');
      cy.get(orderNumber).should('contain', '71163');
      // Закрываем модальное окно
      cy.get(modalClose).click();
      // Проверяем успешность закрытия.
      cy.get('@modal').should('not.exist');
      // Проверяем, что конструктор пуст.
      cy.contains('Выберите булки').should('be.visible');
      cy.contains('Выберите начинку').should('be.visible');
    });
  });
});
