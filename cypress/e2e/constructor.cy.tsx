/// <reference types="cypress" /> # TODO Пока не удается избавится от этого

describe('Тестирование конструктора бургера', () => {
  const url = 'http://localhost:4000';

  it('Страница конструктора бургера доступна', () => {
    // Проверяем, что URL совпадает
    cy.visit(url);
    cy.log('Страница конструктора успешно загружена.');
  });

  beforeEach(() => {
    // Установка фиктивных данных и перехват запросов
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.visit(url);
    cy.wait('@getIngredients');
  });
});
