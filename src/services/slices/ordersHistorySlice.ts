import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getOrdersThunk = createAsyncThunk('orders/history', getOrdersApi);

type TOrdersHistoryState = {
  orders: TOrder[];
  loading: boolean;
  error: string | undefined;
};

const initialState: TOrdersHistoryState = {
  orders: [],
  loading: false,
  error: undefined
};

export const ordersHistorySlice = createSlice({
  name: 'ordersHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  },
  selectors: {
    getOrdersHistory: (state) => state.orders,
    getOrdersHistoryLoading: (state) => state.loading,
    getOrdersHistoryError: (state) => state.error
  }
});

export const {
  getOrdersHistory,
  getOrdersHistoryLoading,
  getOrdersHistoryError
} = ordersHistorySlice.selectors;
