import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getAllFeeds = createAsyncThunk('feeds/get', getFeedsApi);

export const getOrderByNumber = createAsyncThunk(
  'orders/byNumber',
  getOrderByNumberApi
);

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | undefined;
  orderByNumber: TOrder | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: undefined,
  orderByNumber: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(state.error);
      })
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderByNumber = action.payload.orders[0];
      });
  },
  selectors: {
    getFeedLoading: (state) => state.loading,
    getFeedError: (state) => state.error,
    getAllOrders: (state) => state.orders,
    getTotalOrders: (state) => state.total,
    getTotalOrdersToday: (state) => state.totalToday,
    getOrderByNumberSelector: (state) => state.orderByNumber
  }
});

export const {
  getFeedLoading,
  getFeedError,
  getAllOrders,
  getTotalOrders,
  getTotalOrdersToday,
  getOrderByNumberSelector
} = feedSlice.selectors;
