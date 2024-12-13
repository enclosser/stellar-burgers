import {
  constructorReducer,
  addConstructorItem,
  removeConstructorItem,
  moveConstructorItem,
  clearConstructor,
  initialState
} from './burger-constructor';

type TIngredient = {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  id: string;
};

// Данные ингредиентов для тестов
const mockIngredients: Record<'bun' | 'main' | 'sauce', TIngredient> = {
  bun: {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    id: 'TestBun'
  },
  main: {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    id: 'TestMain'
  },
  sauce: {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    id: 'TestSauce'
  }
};

describe('Burger Constructor Reducer', () => {
  it('Добавление булки', () => {
    const newState = constructorReducer(
      initialState,
      addConstructorItem(mockIngredients.bun)
    );
    // Проверяем корректность ID
    expect(newState.bun).toMatchObject({
      ...mockIngredients.bun,
      id: newState.bun?.id
    });
  });

  it('Добавление основного ингредиента', () => {
    const newState = constructorReducer(
      initialState,
      addConstructorItem(mockIngredients.main)
    );
    const expectedResult = [
      { ...mockIngredients.main, id: newState.ingredients[0].id }
    ];
    // Проверяем добавление ингредиента
    expect(newState.ingredients).toEqual(expectedResult);
  });

  it('Удаление ингредиента', () => {
    const preloadedState = {
      ...initialState,
      ingredients: [{ ...mockIngredients.sauce }]
    };
    const newState = constructorReducer(
      preloadedState,
      removeConstructorItem(mockIngredients.sauce.id)
    );
    // Проверяем, что ингредиент удален
    expect(newState.ingredients).toEqual([]);
  });

  it('Изменение порядка ингредиентов', () => {
    const preloadedState = {
      ...initialState,
      ingredients: [mockIngredients.sauce, mockIngredients.main]
    };
    const stateAfterMoveDown = constructorReducer(
      preloadedState,
      moveConstructorItem({ index: 0, move: 'down' })
    );
    expect(stateAfterMoveDown.ingredients[0]).toEqual(mockIngredients.main);
    expect(stateAfterMoveDown.ingredients[1]).toEqual(mockIngredients.sauce);
    const stateAfterMoveUp = constructorReducer(
      stateAfterMoveDown,
      moveConstructorItem({ index: 1, move: 'up' })
    );
    expect(stateAfterMoveUp.ingredients[0]).toEqual(mockIngredients.main);
    expect(stateAfterMoveUp.ingredients[1]).toEqual(mockIngredients.sauce);
  });

  it('Очистка конструктора', () => {
    const preloadedState = {
      ...initialState,
      ingredients: [mockIngredients.sauce, mockIngredients.main],
      bun: mockIngredients.bun
    };
    const newState = constructorReducer(preloadedState, clearConstructor());
    // Проверяем очистку состояния
    expect(newState).toEqual(initialState);
  });

  it('Неизменность состояния при неизвестном экшене', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' } as any;
    const newState = constructorReducer(initialState, unknownAction);
    // Проверяем, что состояние не изменилось
    expect(newState).toEqual(initialState);
  });
});
