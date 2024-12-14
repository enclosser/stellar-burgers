import {
  initialState,
  userReducer,
  loginUserThunk,
  updateUserThunk,
  getUserThunk,
  logoutUserThunk,
  registerUserThunk,
  setUser,
  authCheck,
  userLogout,
  getUserData,
  getUserError,
  getUserIsAuth,
  getUser
} from './user';

describe('Проверка слайса пользователей', () => {
  const mockUser = { email: 'MyTestUser@mail.ru', name: 'My Test User' };

  const createAction = (
    type: string,
    payload: any = undefined,
    error: any = null
  ) => ({
    type,
    payload,
    error
  });

  const testStateChange = (action: any, initial: any, expected: any) => {
    const newState = userReducer(initial, action);
    expect(newState).toEqual(expected);
  };

  test('Установка пользователя в состоянии', () => {
    const action = setUser(mockUser);
    const expectedState = { ...initialState, user: mockUser };
    testStateChange(action, initialState, expectedState);
  });

  test('Проверка авторизации пользователя', () => {
    const action = authCheck();
    const expectedState = { ...initialState, isAuthChecked: true };
    testStateChange(action, initialState, expectedState);
  });

  test('Выход пользователя из системы', () => {
    const action = userLogout();
    const state = { ...initialState, user: mockUser };
    const expectedState = { ...initialState, user: null };
    testStateChange(action, state, expectedState);
  });

  test.each([
    ['registerUserThunk', registerUserThunk],
    ['loginUserThunk', loginUserThunk],
    ['getUserThunk', getUserThunk],
    ['updateUserThunk', updateUserThunk]
  ])('Обработка ожидания действия', (_, thunk) => {
    const action = createAction(thunk.pending.type);
    const expectedState = { ...initialState };
    testStateChange(action, initialState, expectedState);
  });

  test.each([
    ['registerUserThunk', registerUserThunk],
    ['loginUserThunk', loginUserThunk],
    ['getUserThunk', getUserThunk],
    ['updateUserThunk', updateUserThunk]
  ])('Обработка ошибки действия rejected', (_, thunk) => {
    const action = createAction(thunk.rejected.type, undefined, {
      message: 'Ошибка'
    });
    const expectedState = { ...initialState, error: 'Ошибка' };
    testStateChange(action, initialState, expectedState);
  });

  test('Успешная регистрация пользователя', () => {
    const action = createAction(registerUserThunk.fulfilled.type, {
      user: mockUser
    });
    const expectedState = {
      ...initialState,
      isAuthChecked: true,
      user: mockUser
    };
    testStateChange(action, initialState, expectedState);
  });

  test('Получение данных пользователя', () => {
    const action = createAction(getUserThunk.fulfilled.type, {
      user: mockUser
    });
    const expectedState = {
      ...initialState,
      isAuthChecked: true,
      user: mockUser
    };
    testStateChange(action, initialState, expectedState);
  });

  test('Обновление данных пользователя', () => {
    const updatedUser = { ...mockUser, name: 'Обновленное имя' };
    const action = createAction(updateUserThunk.fulfilled.type, {
      user: updatedUser
    });
    const state = { ...initialState, user: mockUser };
    const expectedState = {
      ...state,
      user: updatedUser,
      error: null,
      isAuthChecked: true
    };
    testStateChange(action, state, expectedState);
  });

  test('Успешный выход пользователя из системы', () => {
    const action = createAction(logoutUserThunk.fulfilled.type);
    const expectedState = { ...initialState };
    testStateChange(action, initialState, expectedState);
  });

  test('Получение состояния пользователя', () => {
    const state = { user: { ...initialState, user: mockUser } };
    expect(getUserData(state)).toEqual({ ...initialState, user: mockUser });
    expect(getUserError(state)).toEqual(null);
    expect(getUserIsAuth(state)).toEqual(false);
    expect(getUser(state)).toEqual(mockUser);
  });
});
