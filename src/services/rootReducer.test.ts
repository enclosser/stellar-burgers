import { rootReducer } from './rootReducer';
import store from './store';

describe('Тест rootReducer', () => {
  test('Инициализация rootReducer совпадает с состоянием store', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(initialState);
  });
});
