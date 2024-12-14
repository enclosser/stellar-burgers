import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux'; // Добавляем импорт
import {
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  getUserApi
} from '../../utils/burger-api';
import { TUser } from '@utils-types';

export const registerUserThunk = createAsyncThunk(
  'user/register',
  registerUserApi
);
export const loginUserThunk = createAsyncThunk('user/login', loginUserApi);
export const updateUserThunk = createAsyncThunk('user/update', updateUserApi);
export const getUserThunk = createAsyncThunk('user/request', getUserApi);

const handleAuthError = (state: any, action: AnyAction) => {
  state.error = action.error.message ?? null;
};

const handleAuthSuccess = (
  state: any,
  action: AnyAction,
  setAuthChecked = true
) => {
  state.isAuthChecked = setAuthChecked;
  state.user = action.payload?.user ?? null;
  state.error = null;
};

export const checkUserAuthThunk = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      try {
        const res = await getUserApi();
        dispatch(setUser(res.user));
      } catch {
        logoutCleanUp();
      } finally {
        dispatch(authCheck());
      }
    } else {
      dispatch(authCheck());
    }
  }
);

const logoutCleanUp = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
};

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    await logoutApi();
    logoutCleanUp();
    dispatch(userLogout());
  }
);

type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: null
};

const User = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, () => {})
      .addCase(registerUserThunk.rejected, handleAuthError)
      .addCase(registerUserThunk.fulfilled, (state, action) =>
        handleAuthSuccess(state, action)
      );

    builder
      .addCase(loginUserThunk.rejected, handleAuthError)
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        handleAuthSuccess(state, action);
      });

    builder
      .addCase(getUserThunk.rejected, handleAuthError)
      .addCase(getUserThunk.fulfilled, (state, action) =>
        handleAuthSuccess(state, action)
      );

    builder
      .addCase(updateUserThunk.rejected, handleAuthError)
      .addCase(updateUserThunk.fulfilled, (state, action) =>
        handleAuthSuccess(state, action)
      );
  }
});

export const userReducer = User.reducer;
export const { setUser, authCheck, userLogout } = User.actions;

export const getUserData = (state: { user: TUserState }) => state.user;
export const getUserError = (state: { user: TUserState }) => state.user.error;
export const getUserIsAuth = (state: { user: TUserState }) =>
  state.user.isAuthChecked;
export const getUser = (state: { user: TUserState }) => state.user.user;
