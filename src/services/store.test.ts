import { rootReducer } from './store';

describe('Проверка корневого редьюсера rootReducer', () => {
  it('Проверка', () => {
    const initialState = {
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: undefined,
        orderByNumber: null
      },
      ingredients: {
        ingredients: [],
        loading: false,
        error: undefined
      },
      orderBurger: {
        bun: null,
        ingredients: [],
        loading: false,
        order: null,
        error: undefined
      },
      ordersHistory: {
        orders: [],
        loading: false,
        error: undefined
      },
      user: {
        isAuthChecked: false,
        loading: false,
        user: null,
        error: undefined
      }
    };
    const state = rootReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});
