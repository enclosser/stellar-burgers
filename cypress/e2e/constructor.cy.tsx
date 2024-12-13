/// <reference types="cypress" /> // # TODO Пока не удается избавиться от этого

describe('Тестирование конструктора бургера', () => {
  const url = 'http://localhost:4000'; // URL страницы конструктора

  beforeEach(() => {
    // Перехват API запросов с фиктивными данными
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    // Установка фиктивных токенов авторизации
    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');

    // Загрузка страницы конструктора
    cy.visit(url);
    cy.wait('@getIngredients');
    cy.log('Данные успешно загружены: ингредиенты и пользователь.');
  });

  afterEach(() => {
    // Очистка авторизационных данных
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
    cy.log('Данные авторизации очищены.');
  });

  it('Страница конструктора доступна', () => {
    cy.visit(url);
    cy.log('Страница конструктора успешно загружена.');
  });

  describe('Тестирование формирования заказа', () => {
    const verifyIngredientAddition = (
      category,
      ingredientName,
      verificationText
    ) => {
      // Проверка отображения элемента и добавление ингредиента
      cy.get('div').contains(verificationText).should('exist');
      cy.get('h3')
        .contains(category)
        .next('ul')
        .contains(ingredientName)
        .click();
      cy.get('div').contains(verificationText).should('not.exist');
      cy.log(`${ingredientName} из категории "${category}" успешно добавлен.`);
    };

    it('Добавление булки', () => {
      verifyIngredientAddition('Булки', 'Добавить', 'Выберите булки');
    });

    it('Добавление начинки', () => {
      verifyIngredientAddition('Начинки', 'Добавить', 'Выберите начинку');
    });

    it('Добавление соуса', () => {
      verifyIngredientAddition('Соусы', 'Добавить', 'Выберите начинку');
    });
  });
});
