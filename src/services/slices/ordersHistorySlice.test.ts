import {
  getOrdersThunk,
  ordersHistorySlice,
  initialState
} from './ordersHistorySlice';

describe('Проверка слайса ordersHistorySlice', () => {
  const ordersHistoryTest = [
    {
      _id: '67b84bd8133acd001be5297c',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa094a'
      ],
      status: 'done',
      name: 'Астероидный флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2025-02-21T09:48:08.054Z',
      updatedAt: '2025-02-21T09:48:08.715Z',
      number: 69012
    },
    {
      _id: '67b8d584133acd001be52b5c',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный минеральный бургер',
      createdAt: '2025-02-21T19:35:32.813Z',
      updatedAt: '2025-02-21T19:35:33.529Z',
      number: 69103
    }
  ];

  it('Проверка ordersHistorySlice экшен Request', () => {
    const state = ordersHistorySlice.reducer(
      {
        ...initialState,
        error: 'ошибка'
      },
      getOrdersThunk.pending('')
    );
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });

  it('Проверка ordersHistorySlice экшен Failed', () => {
    const testError = new Error('ошибка');
    const state = ordersHistorySlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrdersThunk.rejected(testError, '')
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'ошибка'
    });
  });

  it('Проверка ordersHistorySlice экшен Success', () => {
    const state = ordersHistorySlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrdersThunk.fulfilled(ordersHistoryTest, '')
    );
    expect(state).toEqual({
      ...initialState,
      orders: ordersHistoryTest
    });
  });
});
