import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

export const getFeedsThunk = createAsyncThunk('orders/getAll', getFeedsApi);

type TFeeds = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeeds = {
  orders: [],
  total: 0,
  totalToday: 0
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeedsThunk.fulfilled, (state, action) => {
      const { orders, total, totalToday } = action.payload;
      Object.assign(state, { orders, total, totalToday });
    });
  }
});

export const feedsReducer = feedsSlice.reducer;
export const getFeedsState = (state: { feeds: TFeeds }) => state.feeds;
