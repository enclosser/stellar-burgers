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

  describe('Тестирование создания заказа', () => {
    describe('Тестирование добавления ингредиентов', () => {
      const verifyIngredientAddition = (
        category,
        ingredientName,
        verificationText
      ) => {
        cy.contains(verificationText).should('exist');
        cy.get('h3')
          .contains(category)
          .next('ul')
          .contains(ingredientName)
          .click();
        cy.contains(verificationText).should('not.exist');
        cy.log(
          `${ingredientName} из категории "${category}" успешно добавлен.`
        );
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

    describe('Тестирование оформления заказа', () => {
      it('Оформление заказа', () => {
        cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
          'postOrders'
        );

        // Проверка что модальное окно не активно
        cy.get('[data-cy=modal]').should('not.exist');

        ['Булки', 'Начинки', 'Соусы'].forEach((category) => {
          cy.get('h3')
            .contains(category)
            .next('ul')
            .contains('Добавить')
            .click();
        });

        cy.contains('Оформить заказ').click();
        cy.wait('@postOrders');

        // Проверка что цена соответствует корректной
        cy.contains('3024').should('exist');

        // Проверка отображения модального окна и номера заказа
        cy.get('[data-cy=modal]').should('be.visible');
        cy.contains('11').should('exist');

        // Проверка закрытия модального окна и отсутствия номера заказа
        cy.get('[data-cy=close-button]').click();
        cy.get('[data-cy=modal]').should('not.exist');
        cy.contains('11').should('not.exist');
        cy.contains('3024').should('not.exist');

        // Проверка контента после очистки
        ['Выберите булки', 'Выберите начинку'].forEach((text) => {
          cy.contains(text).should('exist');
        });
      });
    });
  });
});
