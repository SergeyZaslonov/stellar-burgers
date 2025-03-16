import {
  feedSlice,
  getAllFeeds,
  getOrderByNumber,
  TFeedState
} from './feedSlice';

describe('Проверка слайса feedSlice', () => {
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: undefined,
    orderByNumber: null
  };

  const feedTest = {
    success: true,
    orders: [
      {
        _id: '67d3e4ab6fce7d001db5a189',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2025-03-14T08:11:23.627Z',
        updatedAt: '2025-03-14T08:11:24.259Z',
        number: 71010
      },
      {
        _id: '67d3e49e6fce7d001db5a188',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2025-03-14T08:11:10.202Z',
        updatedAt: '2025-03-14T08:11:10.888Z',
        number: 71009
      },
      {
        _id: '67d3e4116fce7d001db5a187',
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943'],
        status: 'done',
        name: 'Краторный space бургер',
        createdAt: '2025-03-14T08:08:49.083Z',
        updatedAt: '2025-03-14T08:08:49.791Z',
        number: 71008
      }
    ],
    total: 100,
    totalToday: 3
  };

  it('Проверка getAllFeeds экшен Request', () => {
    const state = feedSlice.reducer(
      {
        ...initialState,
        error: 'ошибка'
      },
      getAllFeeds.pending('')
    );
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });

  it('Проверка getAllFeeds экшен Failed', () => {
    const testError = new Error('ошибка');
    const state = feedSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getAllFeeds.rejected(testError, '')
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'ошибка'
    });
  });

  it('Проверка getAllFeeds экшен Success', () => {
    const state = feedSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getAllFeeds.fulfilled(feedTest, '')
    );
    expect(state).toEqual({
      ...initialState,
      orders: feedTest.orders,
      total: feedTest.total,
      totalToday: feedTest.totalToday
    });
  });

  it('Проверка getOrderByNumber экшен Request', () => {
    const state = feedSlice.reducer(
      {
        ...initialState,
        error: 'ошибка'
      },
      getOrderByNumber.pending('', 71010)
    );
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });

  it('Проверка getOrderByNumber экшен Failed', () => {
    const testError = new Error('ошибка');
    const state = feedSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNumber.rejected(testError, '', 71010)
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'ошибка'
    });
  });

  it('Проверка getOrderByNumber экшен Success', () => {
    const state = feedSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNumber.fulfilled(feedTest, '', 71010)
    );
    expect(state).toEqual({
      ...initialState,
      orderByNumber: feedTest.orders[0]
    });
  });
});
